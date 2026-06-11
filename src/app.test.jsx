import { expect, test } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'

import App from './app'
import { randomImages } from './test/fixtures'

test('renders the title and the random gallery from the API', async () => {
  const { container } = render(<App />)
  expect(await screen.findByText(/Doggo Search/i)).toBeInTheDocument()
  await waitFor(() => expect(container.querySelectorAll('img')).toHaveLength(randomImages.length))
})
