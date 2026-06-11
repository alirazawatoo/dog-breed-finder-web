import { describe, expect, it } from 'vitest'

import { formatDogName, mapBreedData } from './helper'

describe('mapBreedData', () => {
    it('reads breed and sub-breed from the image folder', () => {
        expect(mapBreedData(['https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg'])).toEqual([
            { image: 'https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg', breed: 'hound', subBreed: 'afghan' }
        ])
    })

    it('leaves sub-breed empty for plain breeds', () => {
        expect(mapBreedData(['https://images.dog.ceo/breeds/pug/x.jpg'])[0]).toMatchObject({ breed: 'pug', subBreed: '' })
    })

    it('handles an empty or missing list', () => {
        expect(mapBreedData([])).toEqual([])
        expect(mapBreedData()).toEqual([])
    })
})

describe('formatDogName', () => {
    it('puts the sub-breed first, as people say it', () => {
        expect(formatDogName({ breed: 'hound', subBreed: 'afghan' })).toBe('Afghan hound')
        expect(formatDogName({ breed: 'beagle', subBreed: '' })).toBe('Beagle')
    })
})
