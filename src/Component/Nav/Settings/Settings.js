import React, { Component } from 'react'
import Nav from '../Nav'
import { getWpr, getUserData } from '../../../ducks/reducer'
import { connect } from 'react-redux'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './Settings.css'

class Settings extends Component {

    async componentDidMount() {
        let res = await axios.get('/api/user-data')
        // use action creator to update redux store
        this.props.getUserData(res.data)
    }

    render(props) {
        let { getWpr, getUserData } = this.props


        console.log(this.props)
        return (
            <div>
                <Nav />
                <div className='settings_container'>
                    <div className='settings'>
                        <div className='setting_info'>
                            <h1 className='setting'>User: {this.props.user.name}</h1>
                            <h1 className='setting'>WPR: {this.props.user.wpr_id}</h1>
                            {this.props.user.admin ? <Link to='/admin'> <button className='Admin_button'><h3>Admin Page</h3></button></Link> : null
                            }
                        </div>
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


export default connect(mapStateToProps, { getUserData, getWpr })(Settings)




