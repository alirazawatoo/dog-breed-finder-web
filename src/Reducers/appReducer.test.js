import { describe, expect, it } from 'vitest'

import appReducer, { initialState } from './appReducer'
import savedDogsReducer from './savedDogsReducer'
import { selectGalleryDogs } from './selectors'
import * as types from '../constants'
import { breedImages, image, randomImages } from '../test/fixtures'

const loadBreed = (state, breed, subBreeds = []) =>
    appReducer(state, { type: types.GET_BREED_DOGS_SUCCESS, payload: { breed, images: breedImages[breed], subBreeds } })

describe('appReducer', () => {
    it('keeps the selection as an array, even with one breed', () => {
        const state = appReducer(initialState, { type: types.SET_SELECTED_BREEDS, payload: ['hound'] })
        expect(state.selectedBreeds).toEqual(['hound'])
    })

    it('drops data for deselected breeds without mutating the previous state', () => {
        let state = appReducer(initialState, { type: types.SET_SELECTED_BREEDS, payload: ['beagle', 'hound'] })
        state = loadBreed(loadBreed(state, 'beagle'), 'hound', ['afghan', 'basset'])
        const before = state
        const next = appReducer(state, { type: types.SET_SELECTED_BREEDS, payload: ['beagle'] })

        expect(Object.keys(next.dogsByBreed)).toEqual(['beagle'])
        expect(Object.keys(next.subBreeds)).toEqual(['beagle'])
        expect(Object.keys(before.dogsByBreed)).toEqual(['beagle', 'hound'])
    })

    it('clears a filter whose breed is no longer selected', () => {
        let state = appReducer(initialState, { type: types.SET_SELECTED_BREEDS, payload: ['hound'] })
        state = appReducer(state, { type: types.SET_FILTER, payload: { breed: 'hound', subBreed: null } })
        state = appReducer(state, { type: types.SET_SELECTED_BREEDS, payload: ['pug'] })
        expect(state.filter).toBeNull()
    })

    it('ignores a sub-breed response that arrives after the filter changed', () => {
        let state = appReducer(initialState, { type: types.SET_FILTER, payload: { breed: 'hound', subBreed: 'afghan' } })
        state = appReducer(state, { type: types.GALLERY_REQUEST })
        state = appReducer(state, { type: types.SET_FILTER, payload: null })
        state = appReducer(state, {
            type: types.GET_SUB_BREED_DOGS_SUCCESS,
            payload: { breed: 'hound', subBreed: 'afghan', images: [image('hound-afghan', 'late')] }
        })
        expect(state.filteredDogs).toEqual([])
        expect(state.pendingRequests).toBe(0)
    })

    it('copes with an empty image list for a breed', () => {
        const state = appReducer(initialState, {
            type: types.GET_BREED_DOGS_SUCCESS,
            payload: { breed: 'pug', images: [], subBreeds: [] }
        })
        expect(state.dogsByBreed.pug).toEqual([])
    })

    it('records the error and stops loading when a request fails', () => {
        let state = appReducer(initialState, { type: types.GALLERY_REQUEST })
        state = appReducer(state, { type: types.GALLERY_ERROR, payload: 'offline' })
        expect(state).toMatchObject({ pendingRequests: 0, galleryError: 'offline' })
    })
})

describe('selectGalleryDogs', () => {
    const withRandom = appReducer(initialState, { type: types.GET_RANDOM_DOGS_SUCCESS, payload: randomImages })

    it('shows random dogs when nothing is selected', () => {
        expect(selectGalleryDogs(withRandom)).toHaveLength(randomImages.length)
    })

    it('flattens selected breeds in selection order', () => {
        let state = appReducer(withRandom, { type: types.SET_SELECTED_BREEDS, payload: ['pug', 'beagle'] })
        state = loadBreed(loadBreed(state, 'beagle'), 'pug')
        expect(selectGalleryDogs(state).map(dog => dog.breed)).toEqual(['pug', 'beagle', 'beagle'])
    })

    it('narrows to one breed under a breed filter', () => {
        let state = appReducer(withRandom, { type: types.SET_SELECTED_BREEDS, payload: ['pug', 'beagle'] })
        state = loadBreed(loadBreed(state, 'beagle'), 'pug')
        state = appReducer(state, { type: types.SET_FILTER, payload: { breed: 'beagle', subBreed: null } })
        expect(selectGalleryDogs(state)).toHaveLength(breedImages.beagle.length)
    })
})

describe('savedDogsReducer', () => {
    const dog = { image: image('pug', 'a'), breed: 'pug', subBreed: '' }

    it('does not save the same image twice', () => {
        const once = savedDogsReducer([], { type: types.SAVE_DOG, payload: dog })
        expect(savedDogsReducer(once, { type: types.SAVE_DOG, payload: dog })).toBe(once)
    })

    it('removes a dog by image', () => {
        expect(savedDogsReducer([dog], { type: types.REMOVE_SAVED_DOG, payload: dog.image })).toEqual([])
    })
})
