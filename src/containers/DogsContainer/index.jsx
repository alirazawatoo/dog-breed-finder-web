import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import DogCards from '../../components/DogCards'
import SearchBar from '../../components/SearchBar'
import DogFilters from '../../components/DogFilters'
import { addToMySaveDogs, getRandomDogs, removeSavedDog } from '../../actions/dogCardActions'
import { applyFilter, clearFilter } from '../../actions/dogFilterActions'
import { getAllBreeds } from '../../actions/homeActions'
import { updateSelectedBreeds } from '../../actions/searchBarActions'
import { isGalleryLoading, selectGalleryDogs } from '../../Reducers/selectors'
import { capitalize, formatDogName } from '../../lib/helper'

const galleryTitle = (selectedBreeds, filter) => {
    if (filter) return filter.subBreed ? formatDogName(filter) : capitalize(filter.breed)
    if (selectedBreeds.length > 0) return selectedBreeds.map(capitalize).join(', ')
    return 'A random pack'
}

export default function DogsContainer() {
    const search = useSelector(state => state.appReducer)
    const savedDogs = useSelector(state => state.savedDogs)
    const dispatch = useDispatch()
    const dogs = useMemo(() => selectGalleryDogs(search), [search])
    const savedImages = useMemo(() => new Set(savedDogs.map(dog => dog.image)), [savedDogs])
    const { allBreeds, breedsStatus, selectedBreeds, subBreeds, filter, galleryError } = search
    const loading = isGalleryLoading(search)
    const title = galleryTitle(selectedBreeds, filter)
    // A new key remounts the gallery so pagination starts again at page 1.
    const galleryKey = `${selectedBreeds.join(',')}|${filter ? `${filter.breed}/${filter.subBreed}` : ''}`

    const retry = () => {
        if (filter && filter.subBreed) return dispatch(applyFilter(filter.breed, filter.subBreed))
        if (selectedBreeds.length > 0) return dispatch(updateSelectedBreeds(selectedBreeds))
        return dispatch(getRandomDogs())
    }

    const toggleSaved = dog =>
        dispatch(savedImages.has(dog.image) ? removeSavedDog(dog.image) : addToMySaveDogs(dog))

    let galleryBody
    if (galleryError) {
        galleryBody = (
            <div className='notice notice--error' role='alert'>
                <p>Couldn't load photos from the Dog CEO API ({galleryError}).</p>
                <button type='button' className='btn btn--primary' onClick={retry}>Try again</button>
            </div>
        )
    } else if (loading && dogs.length === 0) {
        galleryBody = (
            <ul className='dog-grid' aria-hidden='true'>
                {Array.from({ length: 6 }, (_, index) => <li key={index} className='dog-card dog-card--skeleton' />)}
            </ul>
        )
    } else if (dogs.length === 0) {
        galleryBody = <div className='notice'><p>No photos came back for this selection. Try another breed.</p></div>
    } else {
        galleryBody = (
            <DogCards
                key={galleryKey}
                dogs={dogs}
                label={`${title} photos`}
                renderAction={(dog, name) => {
                    const saved = savedImages.has(dog.image)
                    return (
                        <button
                            type='button'
                            className={`btn btn--small ${saved ? 'btn--saved' : 'btn--primary'}`}
                            aria-pressed={saved}
                            aria-label={`Save ${name}`}
                            onClick={() => toggleSaved(dog)}
                        >
                            {saved ? 'Saved' : 'Save'}
                        </button>
                    )
                }}
            />
        )
    }

    return (
        <div className='search-layout'>
            <section className='search-panel' aria-labelledby='search-heading'>
                <h1 id='search-heading'>Find a breed</h1>
                <p className='muted'>Photos come from the open Dog CEO library. Mix up to five breeds, then narrow them down.</p>
                <SearchBar
                    allBreeds={allBreeds}
                    breedsStatus={breedsStatus}
                    selectedBreeds={selectedBreeds}
                    onChange={breeds => dispatch(updateSelectedBreeds(breeds))}
                    onClear={() => dispatch(updateSelectedBreeds([]))}
                    onRetryBreeds={() => dispatch(getAllBreeds())}
                />
            </section>
            <DogFilters
                selectedBreeds={selectedBreeds}
                subBreeds={subBreeds}
                filter={filter}
                onFilter={(breed, subBreed) => dispatch(applyFilter(breed, subBreed))}
                onReset={() => dispatch(clearFilter())}
            />
            <section className='gallery' aria-labelledby='gallery-heading' aria-busy={loading}>
                <div className='gallery__head'>
                    <h2 id='gallery-heading' className='panel-heading'>{title}</h2>
                    <p className='gallery__count' role='status'>
                        {loading && 'Fetching photos…'}
                        {!loading && !galleryError && `${dogs.length} ${dogs.length === 1 ? 'photo' : 'photos'}`}
                    </p>
                </div>
                {galleryBody}
            </section>
        </div>
    )
}
