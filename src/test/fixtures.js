// Canned Dog CEO responses so tests never reach dog.ceo.
const IMAGE_HOST = 'https://images.dog.ceo/breeds'

export const image = (folder, file) => `${IMAGE_HOST}/${folder}/${file}.jpg`

export const allBreeds = {
  beagle: [],
  hound: ['afghan', 'basset'],
  pug: [],
  terrier: ['border', 'yorkshire'],
}

export const randomImages = [
  image('beagle', 'n02088364_1001'),
  image('hound-afghan', 'n02088094_1002'),
  image('pug', 'n02110958_1003'),
  image('terrier-border', 'n02093754_1004'),
]

export const breedImages = {
  beagle: [image('beagle', 'n02088364_2001'), image('beagle', 'n02088364_2002')],
  hound: [image('hound-afghan', 'n02088094_2003'), image('hound-basset', 'n02088238_2004')],
  pug: [image('pug', 'n02110958_2005')],
  terrier: [image('terrier-border', 'n02093754_2006'), image('terrier-yorkshire', 'n02094433_2007')],
}

export const subBreedImages = (breed, subBreed) =>
  breedImages[breed].filter((url) => url.includes(`/${breed}-${subBreed}/`))
