import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Divider } from 'antd'

import Navbar from '../Navbar'
import DogsContainer from '../../containers/DogsContainer'
import { searchBreed } from '../../actions/searchBarActions'
import * as actions from '../../actions/homeActions'

class Home extends PureComponent {

    componentDidMount = () => {
        this.props.searchItem([])
        this.props.getBreeds()
    }

    render() {
        return (
            <div className='app'>
                <Navbar />
                <Divider />
                <DogsContainer />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    getBreeds: () => {
        dispatch(actions.getAllBreeds())
    },
    searchItem: (breed) => {
        dispatch(searchBreed(breed))
    },
})

export default connect(null, mapDispatchToProps)(Home)
