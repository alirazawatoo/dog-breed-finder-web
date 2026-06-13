import React from 'react'
import { Select, Button, Row, Col } from 'antd'

import '../../stylesheets/app.css'

export default props => {
  const { allBreeds, selectedSearchedBreeds, handleChange, removeBreed, handleClear } = props
  let breeds = Object.keys(allBreeds)
  return (
    <div>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className='gutter-row' span={20}>
          <Select
            mode='multiple'
            showSearch
            showArrow={false}
            placeholder='Search any breed'
            value={selectedSearchedBreeds}
            onChange={handleChange}
            style={{ width: '100%' }}
            onDeselect={removeBreed}
          >
            {
              breeds && breeds.map(item => (
                <Select.Option key={item} value={item}>
                  {item}
                </Select.Option>
              ))
            }
          </Select>
        </Col>
        <Col span={0} />
        <Col className='gutter-row' span={2}>
          <Button
            type='danger'
            shape='round'
            onClick={() => handleClear()}
          >
            Clear
              </Button>
        </Col>
      </Row>
    </div>
  )
}
