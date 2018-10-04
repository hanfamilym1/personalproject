import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux'
import { getWpr, getUserData } from '../../ducks/reducer'
import './Wpr.css'

class Wpr extends Component {
    constructor(props) {
        super(props)

        this.attachWpr = this.attachWpr.bind(this)
    }

    async componentDidMount() {
        let res = await axios.get('/api/user-data')
        // use action creator to update redux store
        this.props.getUserData(res.data)
    }

    attachWpr(props) {
        let { id } = this.props.user
        let { wpr } = this.props
        let newWpr = Number(wpr)
        console.log('id', id, 'wpr', newWpr)
        axios.post('/api/user', { id, newWpr }).then(res => res.data).then(this.props.history.push(`/chat`))
    }

    render(props) {
        const { getWpr, getUserData } = this.props
        console.log(this.props)

        return (
            <div className='WPR'>
                <div className='choose_wpr'>
                    <div className='wpr'>
                        <h3 className='ChooseYour'>Choose Your Cohort</h3>
                        <select name="" id="" onChange={(e) => getWpr(e.target.value)}>
                            <option value="39">39</option>
                            <option value="40">40</option>
                            <option value="41">41</option>
                            <option value="42">42</option>
                        </select> <br />
                        <br />
                        <button className='wpr_button'onClick={this.attachWpr}>Next</button>
                    </div>

                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    let { wpr, user } = state
    return {
        wpr,
        user
    }
}

export default connect(mapStateToProps, { getWpr, getUserData })(Wpr)

