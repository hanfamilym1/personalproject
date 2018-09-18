import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {connect } from 'react-redux'
import {getWpr, getUserData} from '../../ducks/reducer'

class Wpr extends Component {
    constructor(props){
        super(props)

        this.attachWpr= this.attachWpr.bind(this)
    }
    
    async componentDidMount() {
        let res = await axios.get('/api/user-data')
        // use action creator to update redux store
        this.props.getUserData(res.data)
    } 
   
    attachWpr(props){
        let {id} = this.props.user
        let {wpr} = this.props
        let newWpr = Number(wpr)
        console.log('id', id, 'wpr', newWpr)
        axios.post('/api/user', {id, newWpr}).then(res=> res.data)
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
                <option value="39">39</option>
                <option value="40">40</option>
                <option value="41">41</option>
                <option value="42">42</option>
                </select> <br/>
                <br/>
                <Link to='/chat'><button onClick={this.attachWpr}>Next</button></Link>
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

