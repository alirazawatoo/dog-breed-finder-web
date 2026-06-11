import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Navbar from '../Navbar'
import DogCards from '../DogCards'
import { removeSavedDog } from '../../actions/dogCardActions'

export default function SavedDogs() {
    const savedDogs = useSelector(state => state.savedDogs)
    const dispatch = useDispatch()
    return (
        <>
            <Navbar />
            <main id='main' className='page'>
                <div className='page-intro'>
                    <h1>Saved dogs</h1>
                    <p className='muted'>Kept in this browser only, so they stay here after a reload.</p>
                </div>
                {savedDogs.length === 0 ? (
                    <div className='notice'>
                        <p>No saved dogs yet. Press Save on any photo in the <Link to='/'>search results</Link>.</p>
                    </div>
                ) : (
                    <DogCards
                        dogs={savedDogs}
                        label='Saved dogs'
                        renderAction={(dog, name) => (
                            <button
                                type='button'
                                className='btn btn--ghost btn--small'
                                aria-label={`Remove ${name}`}
                                onClick={() => dispatch(removeSavedDog(dog.image))}
                            >
                                Remove
                            </button>
                        )}
                    />
                )}
            </main>
        </>
    )
}
