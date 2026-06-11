import { beforeEach, describe, expect, it } from 'vitest'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'

import App from './app'
import { breedImages, randomImages } from './test/fixtures'
import { server } from './test/server'

const gallery = () => screen.getByRole('region', { name: /random pack|hound|beagle|pug|terrier/i })

const renderApp = async () => {
    const user = userEvent.setup()
    render(<App />)
    await screen.findByRole('heading', { name: 'Find a breed' })
    return user
}

const pickBreed = async (user, breed) => {
    await user.type(screen.getByLabelText('Breeds'), breed)
    // antd renders each option with its label as the title attribute.
    await user.click(await screen.findByTitle(breed.charAt(0).toUpperCase() + breed.slice(1)))
}

beforeEach(() => {
    window.history.pushState({}, '', '/')
})

describe('Doggo Search', () => {
    it('shows the brand and a random pack from the API', async () => {
        await renderApp()
        expect(screen.getByRole('link', { name: /Doggo Search/ })).toBeInTheDocument()
        await waitFor(() => expect(within(gallery()).getAllByRole('img')).toHaveLength(randomImages.length))
        expect(screen.getByRole('status')).toHaveTextContent(`${randomImages.length} photos`)
    })

    it('searches a breed and narrows to a sub-breed', async () => {
        const user = await renderApp()
        await pickBreed(user, 'hound')

        const results = await screen.findByRole('list', { name: 'Hound photos' })
        expect(within(results).getAllByRole('img')).toHaveLength(breedImages.hound.length)

        await user.click(screen.getByRole('button', { name: 'Basset hound' }))
        const filtered = await screen.findByRole('list', { name: 'Basset hound photos' })
        await waitFor(() => expect(within(filtered).getAllByRole('img')).toHaveLength(1))
        expect(screen.getByRole('button', { name: 'Basset hound' })).toHaveAttribute('aria-pressed', 'true')

        await user.click(screen.getByRole('button', { name: 'All selected breeds' }))
        expect(await screen.findByRole('list', { name: 'Hound photos' })).toBeInTheDocument()
    })

    it('saves a dog, lists it on the saved page and removes it again', async () => {
        const user = await renderApp()
        const save = await screen.findAllByRole('button', { name: /^Save / })
        await user.click(save[0])
        expect(save[0]).toHaveAttribute('aria-pressed', 'true')
        expect(screen.getByRole('link', { name: 'Saved dogs (1 saved)' })).toBeInTheDocument()

        await user.click(screen.getByRole('link', { name: /Saved dogs/ }))
        expect(await screen.findByRole('heading', { name: 'Saved dogs' })).toBeInTheDocument()
        await user.click(screen.getByRole('button', { name: /^Remove / }))
        expect(screen.getByText(/No saved dogs yet/)).toBeInTheDocument()
    })

    it('shows an error with a working retry when the API is down', async () => {
        server.use(http.get('https://dog.ceo/api/breeds/image/random/:count', () => new HttpResponse(null, { status: 503 })))
        const user = await renderApp()
        const alert = await screen.findByRole('alert')
        expect(alert).toHaveTextContent("Couldn't load photos from the Dog CEO API (HTTP 503).")

        server.resetHandlers()
        await user.click(within(alert).getByRole('button', { name: 'Try again' }))
        await waitFor(() => expect(within(gallery()).getAllByRole('img')).toHaveLength(randomImages.length))
    })

    it('explains the five-breed limit next to the search box', async () => {
        await renderApp()
        expect(screen.getByLabelText('Breeds')).toHaveAccessibleDescription('Pick up to 5 breeds (0 selected).')
    })
})
