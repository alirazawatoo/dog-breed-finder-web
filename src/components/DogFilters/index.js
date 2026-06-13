import React from 'react'
import { Button } from 'antd'

import '../../stylesheets/app.css'

export default props => {
    const { searchedBreed, subBreeds, selectedSearchedBreeds, resetFilters, getBreedData, getSubBreedData } = props
    return (
        <div className='main-container'>
            <h2>Filters</h2>
            <div>
                <ul>
                    <li>
                        <Button type='link' size='large' onClick={() => resetFilters()}>
                            All
                            </Button>
                    </li>
                    {Object.keys(subBreeds).map((key) => {
                        return (
                            selectedSearchedBreeds && selectedSearchedBreeds.includes(key) && <div>
                                <Button type='link' size='large' onClick={() => getBreedData(key)}>
                                    <h3>{key}</h3>
                                </Button>
                                {subBreeds[key].length > 0 && <li>
                                    {subBreeds[key].map((item) => {
                                        return <li key={item}><Button type='link' size='small' onClick={() => getSubBreedData(key, item)}>{item}</Button></li>
                                    })}
                                </li>
                                }
                            </div>)
                    })
                    }
                </ul>
            </div>
            {searchedBreed && searchedBreed[0] === undefined && <p>Please search any breed having sub-breed to use filters.</p>}
        </div>
    )
}
