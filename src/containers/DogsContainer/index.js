import React, { PureComponent } from 'react'
import { Row, Col } from 'antd'
import { connect } from 'react-redux'
import findIndex from 'lodash/findIndex'

import DogCards from '../../components/DogCards'
import SearchBar from '../../components/SearchBar'
import DogFilters from '../../components/DogFilters'
import * as dogCardActions from '../../actions/dogCardActions'
import * as dogFilterActions from '../../actions/dogFilterActions'
import * as searchActions from '../../actions/searchBarActions'
import { showNotification } from '../../lib/helper'


class DogsContainer extends PureComponent {

    getSubBreedData = (dog, subBreed) => {
        const { getSubBreedDogData } = this.props
        getSubBreedDogData(dog, subBreed)
    }

    getBreedData = breed => {
        const { getBreedDogData } = this.props
        getBreedDogData(breed)
    }

    resetFilters = () => {
        this.props.searchItem([])
        this.props.getRandomDogsList()
    }

    handleChange = breed => {
        const { getRandomDogsList, searchItem, searchDog, getDogSubBreed } = this.props
        if (breed.length === 0) getRandomDogsList()

        if (breed.length > 5) {
            return showNotification('Cannot select more than 5 breeds', 'error', 'Please remove existing breeds to search new ones.')
        }
        const breedData = breed.length > 1 ? breed.length - 1 : 0
        if (breed.length > 1) {
            searchItem(breed)
        } else {
            searchItem(breed[breedData])
        }

        searchDog(breed[breedData])
        getDogSubBreed(breed[breedData])
    }

    removeBreed = breed => {
        this.props.removeItem(breed)
    }

    handleClear = () => {
        this.props.searchItem([])
        this.props.getRandomDogsList()
    }

    saveDog = dog => {
        const { savedDogs, addToMySaveDogs } = this.props
        const description = 'This dog is saved and you can see them in My Saved Dogs page.'
        let found = findIndex(savedDogs, (savedDog) => { return savedDog.image === dog.image })
        if (found >= 0) {
            return showNotification('Dog already saved!', 'error', description)
        }
        addToMySaveDogs(dog)
        return showNotification('Dog saved successfully!', 'success', description)
    }

    render() {
        const { searchedBreed, subBreeds, selectedSearchedBreeds, allBreeds, randomBreedsData, getRandomDogsList } = this.props
        return (
            <div>
                <Row>
                    <Col span={6} />
                    <Col span={6}>
                        <h2>Search</h2>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col span={6} />
                    <Col span={6}>
                        <SearchBar
                            allBreeds={allBreeds}
                            selectedSearchedBreeds={selectedSearchedBreeds}
                            handleChange={this.handleChange}
                            removeBreed={this.removeBreed}
                            handleClear={this.handleClear}
                        />
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col span={5}>
                        <DogFilters
                            searchedBreed={searchedBreed}
                            subBreeds={subBreeds}
                            selectedSearchedBreeds={selectedSearchedBreeds}
                            resetFilters={this.resetFilters}
                            getBreedData={this.getBreedData}
                            getSubBreedData={this.getSubBreedData} />
                    </Col>
                    <Col span={18} style={{ marginLeft: 30 }}>
                        <DogCards
                            randomBreedsData={randomBreedsData}
                            searchedBreed={searchedBreed}
                            saveDog={this.saveDog}
                            getRandomDogsList={getRandomDogsList}/>
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        searchedBreed: state.appReducer.searchedBreed,
        subBreeds: state.appReducer.subBreeds,
        subBreedData: state.appReducer.subBreedData,
        selectedSearchedBreeds: state.appReducer.selectedSearchedBreeds,
        allBreeds: state.appReducer.allBreeds,
        randomBreedsData: state.appReducer.randomBreedsData,
        savedDogs: state.appReducer.savedDogs
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getRandomDogsList: () => {
            dispatch(dogCardActions.getRandomDogs())
        },
        getSubBreedDogData: (breed, subBreed) => {
            dispatch(dogFilterActions.getDogData(breed, subBreed))
        },
        searchItem: breed => {
            dispatch(searchActions.searchBreed(breed))
        },
        getBreedDogData: breed => {
            dispatch(searchActions.getSearchedBreed(breed, true))
        },
        searchDog: breed => {
            dispatch(searchActions.getSearchedBreed(breed))
        },
        getDogSubBreed: breed => {
            dispatch(searchActions.dogSubBreeds(breed))
        },
        removeItem: breed => {
            dispatch(searchActions.deselectBreed(breed))
        },
        addToMySaveDogs: dog => {
            dispatch(dogCardActions.addToMySaveDogs(dog))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DogsContainer)
