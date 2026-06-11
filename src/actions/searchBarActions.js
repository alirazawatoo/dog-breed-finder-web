import * as appActionsConstants from '../constants'
import * as dogService from '../lib/services/dogService'
import { galleryRequest } from './galleryRequest'
import { getRandomDogs } from './dogCardActions'

export const getBreedDogs = breed => dispatch =>
    galleryRequest(
        dispatch,
        () => Promise.all([dogService.getSearchedDog(breed), dogService.getDogSubBreeds(breed)]),
        ([images, subBreeds]) =>
            dispatch({ type: appActionsConstants.GET_BREED_DOGS_SUCCESS, payload: { breed, images, subBreeds } })
    )

// Receives the full new selection from the search box and fetches only breeds not loaded yet.
export const updateSelectedBreeds = nextBreeds => (dispatch, getState) => {
    const breeds = nextBreeds.slice(0, appActionsConstants.MAX_SELECTED_BREEDS)
    const { dogsByBreed, randomDogs } = getState().appReducer
    dispatch({ type: appActionsConstants.SET_SELECTED_BREEDS, payload: breeds })

    if (breeds.length === 0) {
        return randomDogs.length === 0 ? dispatch(getRandomDogs()) : Promise.resolve()
    }
    const missing = breeds.filter(breed => !dogsByBreed[breed])
    return Promise.all(missing.map(breed => dispatch(getBreedDogs(breed))))
}
