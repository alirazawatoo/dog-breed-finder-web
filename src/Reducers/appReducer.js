import * as appActionsConstants from '../constants'
import { mapBreedData } from '../lib/helper'

export const initialState = {
    allBreeds: {},
    breedsStatus: 'idle',
    selectedBreeds: [],
    dogsByBreed: {},
    subBreeds: {},
    randomDogs: [],
    filter: null,
    filteredDogs: [],
    pendingRequests: 0,
    galleryError: null
}

const pickKeys = (object, keys) =>
    Object.fromEntries(Object.entries(object).filter(([key]) => keys.includes(key)))

const finishRequest = state => Math.max(0, state.pendingRequests - 1)

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case appActionsConstants.GET_ALL_BREEDS:
            return { ...state, breedsStatus: 'loading' }
        case appActionsConstants.GET_ALL_BREEDS_SUCCESS:
            return { ...state, breedsStatus: 'succeeded', allBreeds: action.payload }
        case appActionsConstants.GET_ALL_BREEDS_ERROR:
            return { ...state, breedsStatus: 'failed' }

        case appActionsConstants.GALLERY_REQUEST:
            return { ...state, pendingRequests: state.pendingRequests + 1, galleryError: null }
        case appActionsConstants.GALLERY_ERROR:
            return { ...state, pendingRequests: finishRequest(state), galleryError: action.payload }
        case appActionsConstants.GET_RANDOM_DOGS_SUCCESS:
            return { ...state, pendingRequests: finishRequest(state), randomDogs: mapBreedData(action.payload) }
        case appActionsConstants.GET_BREED_DOGS_SUCCESS: {
            const { breed, images, subBreeds } = action.payload
            return {
                ...state,
                pendingRequests: finishRequest(state),
                dogsByBreed: { ...state.dogsByBreed, [breed]: mapBreedData(images) },
                subBreeds: { ...state.subBreeds, [breed]: subBreeds }
            }
        }
        case appActionsConstants.GET_SUB_BREED_DOGS_SUCCESS: {
            const { breed, subBreed, images } = action.payload
            const stillWanted = state.filter && state.filter.breed === breed && state.filter.subBreed === subBreed
            return {
                ...state,
                pendingRequests: finishRequest(state),
                filteredDogs: stillWanted ? mapBreedData(images) : state.filteredDogs
            }
        }

        case appActionsConstants.SET_SELECTED_BREEDS: {
            const selectedBreeds = action.payload
            const filterStillValid = state.filter && selectedBreeds.includes(state.filter.breed)
            return {
                ...state,
                selectedBreeds,
                dogsByBreed: pickKeys(state.dogsByBreed, selectedBreeds),
                subBreeds: pickKeys(state.subBreeds, selectedBreeds),
                filter: filterStillValid ? state.filter : null,
                filteredDogs: filterStillValid ? state.filteredDogs : [],
                galleryError: null
            }
        }
        case appActionsConstants.SET_FILTER:
            return { ...state, filter: action.payload, filteredDogs: [] }

        default:
            return state
    }
}

export default appReducer
