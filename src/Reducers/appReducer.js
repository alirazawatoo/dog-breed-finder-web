import * as appActionsConstants from '../constants'
import { mapBreedData } from '../lib/helper'

const initialState = {
    allBreeds: {},
    randomBreedsData: {},
    searchedBreed: {},
    subBreeds: {},
    subBreedData: {},
    selectedSearchedBreeds: [],
    savedDogs: []
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case appActionsConstants.GET_ALL_BREEDS:
            return {
                ...state,
                allBreeds: {}
            }
        case appActionsConstants.GET_ALL_BREEDS_SUCCESS:
            return {
                ...state,
                allBreeds: action.payload
            }
        case appActionsConstants.GET_ALL_BREEDS_ERROR:
            return {
                ...state,
                allBreeds: {}
            }
        case appActionsConstants.GET_RANDOM_BREEDS:
            return {
                ...state,
                randomBreedsData: {}
            }
        case appActionsConstants.GET_RANDOM_BREEDS_SUCCESS:
            return {
                ...state,
                subBreeds: {},
                randomBreedsData: mapBreedData(action.payload)
            }
        case appActionsConstants.GET_RANDOM_BREEDS_ERROR:
            return {
                ...state,
                randomBreedsData: {}
            }
        case appActionsConstants.GET_SEARCHED_BREED:
            return {
                ...state,
                searchedBreed: {}
            }
        case appActionsConstants.GET_SEARCHED_BREED_SUCCESS: {
            const dog = mapBreedData(action.payload)
            return {
                ...state,
                randomBreedsData: {},
                searchedBreed: { ...state.searchedBreed, [dog[0].breed]: dog }
            }
        }
        case appActionsConstants.GET_SEARCHED_BREED_ERROR:
            return {
                ...state,
                searchedBreed: {}
            }
        case appActionsConstants.GET_SUB_BREEDS_SUCCESS:
            return {
                ...state,
                subBreeds: { ...state.subBreeds, [action.payload.breed]: action.payload.subBreeds }
            }
        case appActionsConstants.GET_SUB_BREED_DATA_SUCCESS: {
            const subDog = mapBreedData(action.payload)
            return {
                ...state,
                randomBreedsData: {},
                searchedBreed: { [subDog[0].breed]: subDog }
            }
        }
        case appActionsConstants.SEARCH_BREED:
            return {
                ...state,
                selectedSearchedBreeds: action.payload
            }
        case appActionsConstants.REMOVE_SEARCHED_BREED:
            delete state.searchedBreed[action.payload]
            return {
                ...state,
                searchedBreed: state.searchedBreed
            }
        case appActionsConstants.SAVE_DOG:
            return {
                ...state,
                savedDogs: [...state.savedDogs, action.payload]
            }
        case appActionsConstants.GET_FILTERED_BREED_DATA:
            return {
                ...state,
                randomBreedsData: {},
                searchedBreed: mapBreedData(action.payload)
            }
        default:
            return state
    }
}

export default appReducer
