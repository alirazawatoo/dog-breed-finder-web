import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import Home from './components/Home'
import SavedDogs from './components/SavedDogs'

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/saved-dogs' element={<SavedDogs />} />
                <Route path='*' element={<Navigate to='/' replace />} />
            </Routes>
        </BrowserRouter>
    )
}
