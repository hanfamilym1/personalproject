import React, {Component} from 'react'
import Nav from '../Nav/Nav'
import Clock from 'react-live-clock'
import moment from 'moment'
import axios from 'axios'
import { getWpr, getUserData } from '../../ducks/reducer'
import {connect} from 'react-redux'

class Timestamp extends Component {
    constructor(props){
        super(props)
        this.state={
            checkin: null,
            checkout: null,
            times: []
        }
    }

    async componentDidMount() {
        let res = await axios.get('/api/user-data')
        // use action creator to update redux store
        this.props.getUserData(res.data)

    }
    handleClick=()=>{
        let {user_id} = this.props.user
        let {checkin} = this.state
        if (checkin === null){
            let clock_in = true
            axios.post('/api/times', {user_id, clock_in})
            this.setState({
                checkin: clock_in
            })
        } else if (checkin === true){
            console.log('Clock out please')
        }
    }

    handleCheckOut=()=>{
        let {user_id} = this.props.user
        let {checkin} = this.state
        if (checkin === true){
            let clock_in = false
            axios.post('/api/times', {user_id, clock_in})
            this.setState({
                checkin: clock_in
            })
            this.getTimes()
        } else if (checkin === false || checkin === null){
            console.log('Clock in please')
        }
    }

    getTimes(){
        axios.get('/api/times').then(res=>{
            this.setState({
                times: res.data
            })
        })
    }

    handleTimeSpent(){
       if (this.state.times){
            console.log(this.state.times)
            let timeSpent = this.state.times.map((e,i)=>{
                console.log(e) 
                let newmoment = moment(e.time).valueOf()
                console.log(newmoment)
                return (
                    <div>
                        <p>{newmoment}</p>
                    </div>
                )
            })
            console.log(timeSpent)

            return timeSpent
       } else {
           return 'Please Clock In and Clock Out When Done'
       }
    }

    render(props){
        console.log(this.state.times)
        console.log(this.props)
        console.log(this.props.user)
        let {checkin, checkout} = this.state
        // const timespent = this.state.times.map((e,i)=>{
        //     if(this.state.times){
        //         return <div>
        //             <p>{moment(e.time)}</p> 
        //         </div>
        //     }
        // })
        
        return(
            <div>
                <Nav/>
                <h2>How long have you been at DevMountain outside of class?</h2>
                <Clock format={'dddd, MMMM Mo, YYYY, h:mm:ss A'} ticking={true} timezone={'US/Mountain'}/> <br/> <br/>
                <button onClick={this.handleClick}>Clock In</button>
                <button onClick={this.handleCheckOut}>Clock Out</button>

                <h5>Time Spent Today:</h5>
                {/* <h6>{timespent}</h6> */}
                <h6>{this.handleTimeSpent()}</h6>
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
export default connect(mapStateToProps, {getUserData, getWpr})(Timestamp)