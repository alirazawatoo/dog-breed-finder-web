import * as appActionsConstants from '../constants'
import * as dogService from '../lib/services/dogService'

export const getSearchedBreed = (breed, filtered = false) => {
    return dispatch => {
        dogService.getSearchedDog(breed).then((response) => {
            if (filtered) {
                dispatch({ type: appActionsConstants.GET_FILTERED_BREED_DATA, payload: response.data.message })
            } else {
                dispatch({ type: appActionsConstants.GET_SEARCHED_BREED_SUCCESS, payload: response.data.message })
            }
        }).catch((e) => {
            console.error(e)
        })
    }
}

export const dogSubBreeds = (breed) => {
    return dispatch => {
        dogService.getDogSubBreeds(breed).then((response) => {
            dispatch({ type: appActionsConstants.GET_SUB_BREEDS_SUCCESS, payload: { subBreeds: response.data.message, breed: breed } })
        }).catch((e) => {
            console.error(e)
        })
    }
}

export const searchBreed = (breed) => {
    return dispatch => {
        dispatch({ type: appActionsConstants.SEARCH_BREED, payload: breed })
    }
}

export const deselectBreed = (breed) => {
    return dispatch => {
        dispatch({ type: appActionsConstants.REMOVE_SEARCHED_BREED, payload: breed })
    }
}
