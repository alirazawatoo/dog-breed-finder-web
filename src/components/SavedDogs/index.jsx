import { useDispatch, useSelector } from 'react-redux'
import { Button, Divider } from 'antd'

import Navbar from '../Navbar'
import DogCards from '../DogCards'
import { removeSavedDog } from '../../actions/dogCardActions'

export default function SavedDogs() {
    const savedDogs = useSelector(state => state.savedDogs)
    const dispatch = useDispatch()
    return (
        <div className='app'>
            <Navbar />
            <Divider />
            <DogCards
                dogs={savedDogs}
                renderAction={dog => (
                    <Button type='link' onClick={() => dispatch(removeSavedDog(dog.image))}>Remove</Button>
                )}
            />
        </div>
    )
}
