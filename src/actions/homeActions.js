import * as appActionsConstants from '../constants'
import * as dogService from '../lib/services/dogService'

export const getAllBreeds = () => {
    return dispatch => {
        dogService.getAllBreedList().then((response) => {
            dispatch({ type: appActionsConstants.GET_ALL_BREEDS_SUCCESS, payload: response.data.message })
        }).catch((e) => {
            console.error(e)
        })
    }
}
