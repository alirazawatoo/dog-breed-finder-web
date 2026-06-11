import { capitalize, formatDogName } from '../../lib/helper'

export default function DogFilters({ selectedBreeds, subBreeds, filter, onFilter, onReset }) {
    const isActive = (breed, subBreed = null) =>
        Boolean(filter) && filter.breed === breed && (filter.subBreed || null) === subBreed

    return (
        <section className='filters' aria-labelledby='filters-heading'>
            <h2 id='filters-heading' className='panel-heading'>Narrow down</h2>
            {selectedBreeds.length === 0 ? (
                <p className='muted'>Pick a breed above, then narrow the photos to one breed or sub-breed here.</p>
            ) : (
                <ul className='filter-list'>
                    <li>
                        <button type='button' className='chip' aria-pressed={!filter} onClick={onReset}>
                            All selected breeds
                        </button>
                    </li>
                    {selectedBreeds.map(breed => (
                        <li key={breed}>
                            <button type='button' className='chip' aria-pressed={isActive(breed)} onClick={() => onFilter(breed)}>
                                {capitalize(breed)}
                            </button>
                            {(subBreeds[breed] || []).length > 0 && (
                                <ul className='filter-list filter-list--sub' aria-label={`${capitalize(breed)} sub-breeds`}>
                                    {subBreeds[breed].map(subBreed => (
                                        <li key={subBreed}>
                                            <button
                                                type='button'
                                                className='chip chip--small'
                                                aria-pressed={isActive(breed, subBreed)}
                                                aria-label={formatDogName({ breed, subBreed })}
                                                onClick={() => onFilter(breed, subBreed)}
                                            >
                                                {capitalize(subBreed)}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </section>
    )
}
