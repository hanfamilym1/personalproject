import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {connect } from 'react-redux'
import {getWpr, getUserData} from '../../ducks/reducer'

class Wpr extends Component {
    
    async componentDidMount() {
        let res = await axios.get('/api/user-data')
        // use action creator to update redux store
        this.props.getUserData(res.data)
    } 
   
    render(props){
        const {getWpr, getUserData} = this.props
        console.log(this.props)
        return(
            <div>
                <br/>
                <br/>
                <h3>Choose Your Cohort</h3>
                <select name="" id="" onChange={(e)=>getWpr(e.target.value)}>
                <option value="1">39</option>
                <option value="2">40</option>
                <option value="3">41</option>
                <option value="4">42</option>
                </select> <br/>
                <br/>
                <Link to='/chat'><button>Next</button></Link>
            </div>
        )
    }
}    

function mapStateToProps(state){
        let {wpr, user} = state
        return{
            wpr,
            user
        }
}

export default connect(mapStateToProps, {getWpr, getUserData})(Wpr)

