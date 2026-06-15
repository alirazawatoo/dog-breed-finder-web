import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import factory from './store.js'
import Routes from './Routes'
import './stylesheets/app.css'

const { store, persistor } = factory()

export default function App() {
  return (
    <div className="app">
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <div>
            <Routes />
          </div>
        </PersistGate>
      </Provider>
    </div>
  )
}
