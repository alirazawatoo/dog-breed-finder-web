import { Select } from 'antd'

import { MAX_SELECTED_BREEDS } from '../../constants'
import { capitalize } from '../../lib/helper'

export default function SearchBar({ allBreeds, breedsStatus, selectedBreeds, onChange, onClear, onRetryBreeds }) {
    const options = Object.keys(allBreeds).map(breed => ({ label: capitalize(breed), value: breed }))
    return (
        <div className='search-bar'>
            <label htmlFor='breed-search' className='field-label'>Breeds</label>
            <div className='search-bar__row'>
                <Select
                    id='breed-search'
                    className='search-bar__select'
                    mode='multiple'
                    showSearch
                    virtual={false}
                    suffix={null}
                    maxCount={MAX_SELECTED_BREEDS}
                    loading={breedsStatus === 'loading'}
                    placeholder='Type a breed, e.g. hound'
                    notFoundContent={breedsStatus === 'loading' ? 'Loading breeds…' : 'No breed by that name'}
                    aria-describedby='breed-search-hint'
                    value={selectedBreeds}
                    onChange={onChange}
                    options={options}
                />
                <button type='button' className='btn btn--ghost' onClick={onClear} disabled={selectedBreeds.length === 0}>
                    Clear
                </button>
            </div>
            <p id='breed-search-hint' className='hint'>
                Pick up to {MAX_SELECTED_BREEDS} breeds ({selectedBreeds.length} selected).
            </p>
            {breedsStatus === 'failed' && (
                <p className='notice notice--error' role='alert'>
                    The breed list didn't load.{' '}
                    <button type='button' className='btn btn--link' onClick={onRetryBreeds}>Try again</button>
                </p>
            )}
        </div>
    )
}
