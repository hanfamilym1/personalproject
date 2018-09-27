import React, {Component} from 'react'
import Nav from '../Nav/Nav'
import Clock from 'react-live-clock'
import moment from 'moment'
import axios from 'axios'
import { getWpr, getUserData } from '../../ducks/reducer'
import {connect} from 'react-redux'
import 'moment-duration-format'

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
            let channel = this.state.times.slice()
            let time1 = channel.shift()
            console.log('time1', time1)
            let time2 = channel.pop()
            console.log('time2', time2)
            if (time1){
                console.log(time1.time)
                let newtime1 = moment(time1.time).valueOf()
                let newtime2 = moment(time2.time).valueOf()
                console.log(newtime1)
                console.log(newtime2)
                let calculatedTime = newtime1 - newtime2
                console.log(calculatedTime)
                let showntime = moment.duration(calculatedTime, "milliseconds").format("h [hrs], m [min]")
                console.log(showntime)
                return showntime
            }
            return 'Please Clock In and Clock Out When Done'
           
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

                <h2>Time Spent Today:</h2>
                {/* <h6>{timespent}</h6> */}
                <h3>{this.handleTimeSpent()}</h3>
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