import { getMessage } from './baseService.js'

export const getAllBreedList = () => getMessage('/breeds/list/all')

export const getRandomDogsList = () => getMessage('/breeds/image/random/50')

export const getSearchedDog = breed => getMessage(`/breed/${breed}/images/random/50`)

export const getDogSubBreeds = breed => getMessage(`/breed/${breed}/list`)

export const getSubBreedDogData = (breed, subBreed) => getMessage(`/breed/${breed}/${subBreed}/images/random/50`)
