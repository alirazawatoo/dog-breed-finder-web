import { describe, expect, it } from 'vitest'
import { http, HttpResponse } from 'msw'

import { createAppStore, migrateSavedState } from '../store'
import { getAllBreeds } from './homeActions'
import { getRandomDogs } from './dogCardActions'
import { updateSelectedBreeds } from './searchBarActions'
import { applyFilter } from './dogFilterActions'
import { selectGalleryDogs } from '../Reducers/selectors'
import { allBreeds, breedImages } from '../test/fixtures'
import { server } from '../test/server'

const search = store => store.getState().appReducer

describe('thunks against the mocked Dog CEO API', () => {
    it('loads the breed list', async () => {
        const store = createAppStore()
        await store.dispatch(getAllBreeds())
        expect(search(store)).toMatchObject({ breedsStatus: 'succeeded', allBreeds })
    })

    it('fetches images and sub-breeds for each newly selected breed only', async () => {
        const store = createAppStore()
        let calls = 0
        server.events.on('request:start', () => { calls += 1 })

        await store.dispatch(updateSelectedBreeds(['hound']))
        await store.dispatch(updateSelectedBreeds(['hound', 'beagle']))
        server.events.removeAllListeners()

        expect(calls).toBe(4)
        expect(search(store).subBreeds).toEqual({ hound: ['afghan', 'basset'], beagle: [] })
        expect(selectGalleryDogs(search(store))).toHaveLength(breedImages.hound.length + breedImages.beagle.length)
    })

    it('caps the selection at five breeds', async () => {
        const store = createAppStore()
        await store.dispatch(updateSelectedBreeds(['beagle', 'hound', 'pug', 'terrier', 'beagle', 'pug']))
        expect(search(store).selectedBreeds).toHaveLength(5)
    })

    it('falls back to random dogs when the selection is cleared', async () => {
        const store = createAppStore()
        await store.dispatch(updateSelectedBreeds(['pug']))
        await store.dispatch(updateSelectedBreeds([]))
        expect(search(store).selectedBreeds).toEqual([])
        expect(search(store).randomDogs.length).toBeGreaterThan(0)
    })

    it('loads sub-breed images for a sub-breed filter', async () => {
        const store = createAppStore()
        await store.dispatch(updateSelectedBreeds(['hound']))
        await store.dispatch(applyFilter('hound', 'basset'))
        expect(selectGalleryDogs(search(store)).map(dog => dog.subBreed)).toEqual(['basset'])
    })

    it('surfaces an API failure as a gallery error', async () => {
        server.use(http.get('https://dog.ceo/api/breeds/image/random/:count', () => new HttpResponse(null, { status: 503 })))
        const store = createAppStore()
        await store.dispatch(getRandomDogs())
        expect(search(store).galleryError).toMatch(/503/)
        expect(search(store).pendingRequests).toBe(0)
    })
})

describe('migrateSavedState', () => {
    it('keeps only saved dogs from the old whole-state snapshot', async () => {
        const saved = [{ image: 'x', breed: 'pug', subBreed: '' }]
        const migrated = await migrateSavedState({ appReducer: { savedDogs: saved, searchedBreed: {} }, _persist: { version: -1 } })
        expect(migrated).toEqual({ savedDogs: saved, _persist: { version: -1 } })
    })
})
