import * as appActionsConstants from '../constants'
import * as dogService from '../lib/services/dogService'

export const getDogData = (breed, subBreed = null) => {
    return dispatch => {
        dogService.getSubBreedDogData(breed, subBreed).then((response) => {
            dispatch({ type: appActionsConstants.GET_SUB_BREED_DATA_SUCCESS, payload: response.data.message })
        }).catch((e) => {
            console.error(e)
        })
    }
}
