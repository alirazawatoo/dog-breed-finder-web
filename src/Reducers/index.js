import { combineReducers } from 'redux'

import appReducer from './appReducer'
import savedDogsReducer from './savedDogsReducer'

const rootReducer = combineReducers({ appReducer, savedDogs: savedDogsReducer })

export default rootReducer
