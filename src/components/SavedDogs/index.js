import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Card, Pagination, Divider } from 'antd'

import Navbar from '../Navbar'
import '../../stylesheets/app.css'

class SavedDogs extends PureComponent {
    state = {
        minValue: 0,
        maxValue: 12
    }

    handleChange = currentPage => {
        this.setState({
            minValue: currentPage * 12 - 12,
            maxValue: currentPage * 12
        })
    }

    saveDog = dog => {
        this.props.addToMySaveDogs(dog)
    }

    render() {
        const { savedDogs } = this.props
        return (
            <div className='app'>
                <Navbar />
                <Divider />
                <div className='main-container'>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className='justified'>
                        {
                            savedDogs.slice(this.state.minValue, this.state.maxValue).map((item, index) => {
                                return (
                                    <Col span={7} className='gutter-row col' key={index}>
                                        <Card
                                            cover={<img alt='' style={{ height: 300 }} src={item.image} />}
                                            className='card-style'
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
                        total={savedDogs.length}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        savedDogs: state.appReducer.savedDogs
    }
}

const mapDispatchToProps = dispatch => { return }

export default connect(mapStateToProps, mapDispatchToProps)(SavedDogs)
