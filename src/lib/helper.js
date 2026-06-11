export const capitalize = word => word.charAt(0).toUpperCase() + word.slice(1)

// Image URLs look like https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg;
// the folder name is the only place the API tells us which breed a random image is.
export const mapBreedData = (urls = []) =>
    urls.map(image => {
        const folder = new URL(image).pathname.split('/')[2] || ''
        const [breed, ...rest] = folder.split('-')
        return { image, breed, subBreed: rest.join('-') }
    })

export const formatDogName = ({ breed, subBreed }) =>
    subBreed ? `${capitalize(subBreed)} ${breed}` : capitalize(breed)
