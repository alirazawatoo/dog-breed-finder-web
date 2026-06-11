import * as appActionsConstants from '../constants'
import * as dogService from '../lib/services/dogService'

export const getAllBreeds = () => dispatch => {
    dispatch({ type: appActionsConstants.GET_ALL_BREEDS })
    return dogService.getAllBreedList()
        .then(breeds => dispatch({ type: appActionsConstants.GET_ALL_BREEDS_SUCCESS, payload: breeds }))
        .catch(() => dispatch({ type: appActionsConstants.GET_ALL_BREEDS_ERROR }))
}
