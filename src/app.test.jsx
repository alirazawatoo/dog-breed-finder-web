import { expect, test } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'

import App from './app'
import { randomImages } from './test/fixtures'

test('renders the title and the random gallery from the API', async () => {
    render(<App />)
    expect(await screen.findByText(/Doggo Search/i)).toBeInTheDocument()
    await waitFor(() => expect(screen.getAllByRole('img', { name: /beagle|hound|pug|terrier/i })).toHaveLength(randomImages.length))
})
