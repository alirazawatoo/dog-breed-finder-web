import * as appActionsConstants from '../constants'

const savedDogsReducer = (state = [], action) => {
    switch (action.type) {
        case appActionsConstants.SAVE_DOG:
            if (state.some(dog => dog.image === action.payload.image)) return state
            return [...state, action.payload]
        case appActionsConstants.REMOVE_SAVED_DOG:
            return state.filter(dog => dog.image !== action.payload)
        default:
            return state
    }
}

export default savedDogsReducer
