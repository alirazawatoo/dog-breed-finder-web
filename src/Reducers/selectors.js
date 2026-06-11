// The gallery shows, in priority order: an active filter, the selected breeds, or the random set.
export const selectGalleryDogs = ({ filter, filteredDogs, selectedBreeds, dogsByBreed, randomDogs }) => {
    if (filter) return filter.subBreed ? filteredDogs : dogsByBreed[filter.breed] || []
    if (selectedBreeds.length > 0) return selectedBreeds.flatMap(breed => dogsByBreed[breed] || [])
    return randomDogs
}

export const isGalleryLoading = ({ pendingRequests }) => pendingRequests > 0
