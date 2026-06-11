import * as appActionsConstants from '../constants'
import * as dogService from '../lib/services/dogService'
import { galleryRequest } from './galleryRequest'

export const applyFilter = (breed, subBreed = null) => dispatch => {
    dispatch({ type: appActionsConstants.SET_FILTER, payload: { breed, subBreed } })
    // Whole-breed images are already loaded; only sub-breeds need their own request.
    if (!subBreed) return Promise.resolve()
    return galleryRequest(
        dispatch,
        () => dogService.getSubBreedDogData(breed, subBreed),
        images =>
            dispatch({ type: appActionsConstants.GET_SUB_BREED_DOGS_SUCCESS, payload: { breed, subBreed, images } })
    )
}

export const clearFilter = () => ({ type: appActionsConstants.SET_FILTER, payload: null })
