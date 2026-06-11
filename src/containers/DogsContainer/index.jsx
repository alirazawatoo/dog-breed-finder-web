import { useMemo } from 'react'
import { Row, Col, Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import DogCards from '../../components/DogCards'
import SearchBar from '../../components/SearchBar'
import DogFilters from '../../components/DogFilters'
import { addToMySaveDogs } from '../../actions/dogCardActions'
import { applyFilter, clearFilter } from '../../actions/dogFilterActions'
import { updateSelectedBreeds } from '../../actions/searchBarActions'
import { selectGalleryDogs } from '../../Reducers/selectors'
import { MAX_SELECTED_BREEDS } from '../../constants'
import { showNotification } from '../../lib/helper'

export default function DogsContainer() {
    const search = useSelector(state => state.appReducer)
    const savedDogs = useSelector(state => state.savedDogs)
    const dispatch = useDispatch()
    const dogs = useMemo(() => selectGalleryDogs(search), [search])
    const { allBreeds, selectedBreeds, subBreeds, filter } = search
    // A new key remounts the gallery so pagination starts again at page 1.
    const galleryKey = `${selectedBreeds.join(',')}|${filter ? `${filter.breed}/${filter.subBreed}` : ''}`

    const handleChange = breeds => {
        if (breeds.length > MAX_SELECTED_BREEDS) {
            return showNotification(`Cannot select more than ${MAX_SELECTED_BREEDS} breeds`, 'error', 'Please remove existing breeds to search new ones.')
        }
        dispatch(updateSelectedBreeds(breeds))
    }

    const saveDog = dog => {
        const description = 'This dog is saved and you can see them in My Saved Dogs page.'
        if (savedDogs.some(savedDog => savedDog.image === dog.image)) {
            return showNotification('Dog already saved!', 'error', description)
        }
        dispatch(addToMySaveDogs(dog))
        return showNotification('Dog saved successfully!', 'success', description)
    }

    return (
        <div>
            <h2>Search</h2>
            <SearchBar
                allBreeds={allBreeds}
                selectedBreeds={selectedBreeds}
                onChange={handleChange}
                onClear={() => handleChange([])}
            />
            <br />
            <Row>
                <Col span={5}>
                    <DogFilters
                        selectedBreeds={selectedBreeds}
                        subBreeds={subBreeds}
                        onFilter={(breed, subBreed) => dispatch(applyFilter(breed, subBreed))}
                        onReset={() => dispatch(clearFilter())}
                    />
                </Col>
                <Col span={18} style={{ marginLeft: 30 }}>
                    <DogCards
                        key={galleryKey}
                        dogs={dogs}
                        renderAction={dog => <Button type='link' onClick={() => saveDog(dog)}>Save dog</Button>}
                    />
                </Col>
            </Row>
        </div>
    )
}
