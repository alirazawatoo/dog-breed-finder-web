import { Select, Button, Row, Col } from 'antd'

import '../../stylesheets/app.css'

export default function SearchBar({ allBreeds, selectedBreeds, onChange, onClear }) {
    const options = Object.keys(allBreeds).map(breed => ({ label: breed, value: breed }))
    return (
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col className='gutter-row' span={20}>
                <Select
                    mode='multiple'
                    showSearch
                    suffix={null}
                    placeholder='Search any breed'
                    value={selectedBreeds}
                    onChange={onChange}
                    options={options}
                    style={{ width: '100%' }}
                />
            </Col>
            <Col className='gutter-row' span={2}>
                <Button danger shape='round' onClick={onClear}>Clear</Button>
            </Col>
        </Row>
    )
}
