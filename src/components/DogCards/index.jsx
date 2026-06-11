import { useState } from 'react'
import { Row, Col, Card, Pagination } from 'antd'

import { PAGE_SIZE } from '../../constants'
import { formatDogName } from '../../lib/helper'
import '../../stylesheets/app.css'

export default function DogCards({ dogs, renderAction }) {
    const [page, setPage] = useState(1)
    const lastPage = Math.max(1, Math.ceil(dogs.length / PAGE_SIZE))
    const currentPage = Math.min(page, lastPage)
    const visibleDogs = dogs.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

    return (
        <div className='main-container'>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className='justified'>
                {visibleDogs.map(dog => (
                    <Col span={7} className='gutter-row col' key={dog.image}>
                        <Card
                            cover={<img alt={formatDogName(dog)} style={{ height: 300 }} src={dog.image} />}
                            className='card-style'
                            actions={renderAction ? [renderAction(dog)] : undefined}
                        >
                            <Card.Meta title={formatDogName(dog)} />
                        </Card>
                    </Col>
                ))}
            </Row>
            <Pagination
                current={currentPage}
                pageSize={PAGE_SIZE}
                showSizeChanger={false}
                onChange={setPage}
                total={dogs.length}
            />
        </div>
    )
}
