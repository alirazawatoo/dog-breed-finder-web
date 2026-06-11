import { useState } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ConfigProvider } from 'antd'

import createPersistedStore from './store.js'
import AppRoutes from './AppRoutes'
import { antdTheme } from './theme'
import './stylesheets/app.css'

export default function App() {
    // One store per mounted app, so tests and hot reloads start clean.
    const [{ store, persistor }] = useState(createPersistedStore)
    return (
        <ConfigProvider theme={antdTheme}>
            <Provider store={store}>
                <PersistGate persistor={persistor} loading={null}>
                    <AppRoutes />
                </PersistGate>
            </Provider>
        </ConfigProvider>
    )
}
