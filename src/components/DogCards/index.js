import React, { PureComponent } from 'react'
import { Row, Col, Card, Pagination, Button } from 'antd'

import '../../stylesheets/app.css'

class DogCards extends PureComponent {
    state = {
        minValue: 0,
        maxValue: 12
    }

    componentDidMount = () => {
        this.props.getRandomDogsList()
    }

    handleChange = currentPage => {
        this.setState({
            minValue: currentPage * 12 - 12,
            maxValue: currentPage * 12
        })
    }

    render() {
        const { randomBreedsData, searchedBreed, saveDog } = this.props
        let collectedData = [].concat.apply([], Object.values(searchedBreed))
        return (
            <div className='main-container'>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className='justified'>
                    {(randomBreedsData && randomBreedsData[0] && randomBreedsData[0].breed !== undefined) ?
                        Object.entries(randomBreedsData).slice(this.state.minValue, this.state.maxValue).map((item, index) => {
                            return (
                                <Col span={7} className='gutter-row col' key={index}>
                                    <Card
                                        cover={<img alt='' style={{ height: 300 }} src={item[1].image} />}
                                        className='card-style'
                                        actions={[
                                            <Button type='link' onClick={() => saveDog(item[1])}>Save Dog &nbsp; ❤️</Button>
                                        ]}
                                    >
                                        <Card.Meta title={item[1].subBreed ? `${item[1].breed}, ${item[1].subBreed}` : `${item[1].breed}`} />
                                    </Card>
                                </Col>
                            )
                        })
                        :
                        collectedData.slice(this.state.minValue, this.state.maxValue).map((item, index) => {
                            return (
                                <Col span={7} className='gutter-row col' key={index}>
                                    <Card
                                        cover={<img alt='' style={{ height: 300 }} src={item.image} />}
                                        className='card-style'
                                        actions={[
                                            <Button type='link' onClick={() => saveDog(item)}>Save Dog &nbsp; ❤️</Button>
                                        ]}
                                    >
                                        <Card.Meta title={item.subBreed ? `${item.breed}, ${item.subBreed}` : `${item.breed}`} />
                                    </Card>
                                </Col>
                            )
                        })
                    }
                </Row>
                <Pagination
                    defaultCurrent={1}
                    defaultPageSize={12}
                    pageSize={12}
                    showSizeChanger={false}
                    onChange={this.handleChange}
                    total={collectedData.length > 0 ? collectedData.length : randomBreedsData.length}
                />
            </div>
        )
    }
}

export default DogCards
