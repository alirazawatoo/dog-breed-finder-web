import * as appActionsConstants from '../constants'
import * as dogService from '../lib/services/dogService'

export const getRandomDogs = () => {
    return dispatch => {
        dogService.getRandomDogsList().then((message) => {
            dispatch({ type: appActionsConstants.GET_SEARCHED_BREED })
            dispatch({ type: appActionsConstants.GET_RANDOM_BREEDS_SUCCESS, payload: message })
        }).catch((e) => {
            console.error(e)
        })
    }
}

export const addToMySaveDogs = dog => {
    return dispatch => {
        dispatch({ type: appActionsConstants.SAVE_DOG, payload: dog })
    }
}
