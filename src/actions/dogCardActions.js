import * as appActionsConstants from '../constants'
import * as dogService from '../lib/services/dogService'
import { galleryRequest } from './galleryRequest'

export const getRandomDogs = () => dispatch =>
    galleryRequest(dispatch, dogService.getRandomDogsList, images =>
        dispatch({ type: appActionsConstants.GET_RANDOM_DOGS_SUCCESS, payload: images })
    )

export const addToMySaveDogs = dog => ({ type: appActionsConstants.SAVE_DOG, payload: dog })

export const removeSavedDog = image => ({ type: appActionsConstants.REMOVE_SAVED_DOG, payload: image })
