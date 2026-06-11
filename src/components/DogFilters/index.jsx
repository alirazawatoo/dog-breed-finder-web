import { Button } from 'antd'

import '../../stylesheets/app.css'

export default function DogFilters({ selectedBreeds, subBreeds, onFilter, onReset }) {
    return (
        <div className='main-container'>
            <h2>Filters</h2>
            <ul>
                <li>
                    <Button type='link' size='large' onClick={onReset}>All</Button>
                </li>
                {selectedBreeds.map(breed => (
                    <li key={breed}>
                        <Button type='link' size='large' onClick={() => onFilter(breed)}>{breed}</Button>
                        {(subBreeds[breed] || []).length > 0 && (
                            <ul>
                                {subBreeds[breed].map(subBreed => (
                                    <li key={subBreed}>
                                        <Button type='link' size='small' onClick={() => onFilter(breed, subBreed)}>{subBreed}</Button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
            {selectedBreeds.length === 0 && <p>Please search any breed having sub-breed to use filters.</p>}
        </div>
    )
}
