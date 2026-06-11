import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

import { allBreeds, breedImages, randomImages, subBreedImages } from './fixtures'

const API = 'https://dog.ceo/api'
const ok = (message) => HttpResponse.json({ message, status: 'success' })

export const handlers = [
  http.get(`${API}/breeds/list/all`, () => ok(allBreeds)),
  http.get(`${API}/breeds/image/random/:count`, () => ok(randomImages)),
  http.get(`${API}/breed/:breed/list`, ({ params }) => ok(allBreeds[params.breed] || [])),
  http.get(`${API}/breed/:breed/images/random/:count`, ({ params }) => ok(breedImages[params.breed] || [])),
  http.get(`${API}/breed/:breed/:subBreed/images/random/:count`, ({ params }) =>
    ok(subBreedImages(params.breed, params.subBreed))
  ),
]

export const server = setupServer(...handlers)
