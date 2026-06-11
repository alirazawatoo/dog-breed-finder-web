import * as appActionsConstants from '../constants'

// Wraps a Dog CEO call so the gallery's loading counter and error message stay consistent.
export const galleryRequest = (dispatch, request, onSuccess) => {
    dispatch({ type: appActionsConstants.GALLERY_REQUEST })
    return request()
        .then(onSuccess)
        .catch(error => dispatch({ type: appActionsConstants.GALLERY_ERROR, payload: error.message }))
}
