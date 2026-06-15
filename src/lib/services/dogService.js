import baseService from './baseService.js'

export const getAllBreedList = () => {
    return baseService.get('/breeds/list/all')
}

export const getRandomDogsList = () => {
    return baseService.get('/breeds/image/random/50')
}

export const getSearchedDog = breed => (
    baseService.get(`/breed/${breed}/images/random/50`)
)

export const getDogSubBreeds = breed => {
    return baseService.get(`/breed/${breed}/list`)
}

export const getSubBreedDogData = (breed, subBreed) => {
    return baseService.get(`/breed/${breed}/${subBreed}/images/random/50`)
}
