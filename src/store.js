import { applyMiddleware, legacy_createStore as createStore } from 'redux'
import { thunk } from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/es/storage'

import rootReducer from './Reducers/index'

// Version 0 persisted the whole app state; only the saved dogs are worth keeping.
export const migrateSavedState = state => {
    if (!state || !state.appReducer) return Promise.resolve(state)
    const { appReducer, _persist } = state
    return Promise.resolve({ savedDogs: appReducer.savedDogs || [], _persist })
}

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: ['savedDogs'],
    migrate: migrateSavedState
}

export const createAppStore = (reducer = rootReducer) => createStore(reducer, applyMiddleware(thunk))

export default () => {
    const store = createAppStore(persistReducer(persistConfig, rootReducer))
    const persistor = persistStore(store)
    return { store, persistor }
}
