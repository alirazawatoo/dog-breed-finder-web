import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Navbar from '../Navbar'
import DogsContainer from '../../containers/DogsContainer'
import { getAllBreeds } from '../../actions/homeActions'
import { getRandomDogs } from '../../actions/dogCardActions'

export default function Home() {
    const dispatch = useDispatch()
    const breedsStatus = useSelector(state => state.appReducer.breedsStatus)
    const hasRandomDogs = useSelector(state => state.appReducer.randomDogs.length > 0)

    useEffect(() => {
        if (breedsStatus === 'idle') dispatch(getAllBreeds())
        if (!hasRandomDogs) dispatch(getRandomDogs())
        // Only on first visit: later visits reuse what is already in the store.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <Navbar />
            <main id='main' className='page'>
                <DogsContainer />
            </main>
        </>
    )
}
