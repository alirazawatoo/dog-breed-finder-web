import { useState } from 'react'
import { Pagination } from 'antd'

import { PAGE_SIZE } from '../../constants'
import { formatDogName } from '../../lib/helper'

export default function DogCards({ dogs, label, renderAction }) {
    const [page, setPage] = useState(1)
    const lastPage = Math.max(1, Math.ceil(dogs.length / PAGE_SIZE))
    const currentPage = Math.min(page, lastPage)
    const visibleDogs = dogs.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

    return (
        <>
            <ul className='dog-grid' aria-label={label}>
                {visibleDogs.map(dog => {
                    const name = formatDogName(dog)
                    return (
                        <li key={dog.image} className='dog-card'>
                            <img className='dog-card__photo' src={dog.image} alt={name} loading='lazy' width='400' height='300' />
                            <div className='dog-card__body'>
                                <p className='dog-card__name'>{name}</p>
                                {renderAction && renderAction(dog, name)}
                            </div>
                        </li>
                    )
                })}
            </ul>
            {dogs.length > PAGE_SIZE && (
                <Pagination
                    className='gallery-pagination'
                    align='center'
                    current={currentPage}
                    pageSize={PAGE_SIZE}
                    showSizeChanger={false}
                    onChange={setPage}
                    total={dogs.length}
                />
            )}
        </>
    )
}
