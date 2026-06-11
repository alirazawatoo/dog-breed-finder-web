import * as appActionsConstants from '../constants'
import * as dogService from '../lib/services/dogService'

export const getAllBreeds = () => {
    return dispatch => {
        dogService.getAllBreedList().then((message) => {
            dispatch({ type: appActionsConstants.GET_ALL_BREEDS_SUCCESS, payload: message })
        }).catch((e) => {
            console.error(e)
        })
    }
}
