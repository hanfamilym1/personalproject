import React, { Component } from 'react'
import Nav from '../Nav/Nav'
import io from 'socket.io-client'
import axios from 'axios'
import './Chat.css'
import { getWpr, getUserData } from '../../ducks/reducer'
import { connect } from 'react-redux'
import moment from'moment'
import 'moment-timezone'

class Chat extends Component {
    constructor() {
        super()
        this.state = {
            userID: null,
            messages: []
        }
        this.updateMessages = this.updateMessages.bind(this)
        this.setUserId = this.setUserId.bind(this)
        this.sendMessage = this.sendMessage.bind(this)
        // this.getMessages = this.getMessages.bind(this)
    }

    async componentDidMount() {
        let res = await axios.get('/api/user-data')
        // use action creator to update redux store
        this.props.getUserData(res.data)
        this.getMessages()
        this.socket = io('/')
        this.socket.on('message dispatched', this.updateMessages)
        this.socket.on('welcome', this.setUserId)
        this.socket.on('room joined', this.joinSuccess)
        this.joinRoom()
    }

    getMessages(){
        console.log(this.props.user.wpr_id)
        axios.get(`/api/messages/${this.props.user.wpr_id}`).then(res=>
            
            this.setState({
            messages: res.data
        }))
    }
    //is it working?  probably not.  I'm trying to remember how this should work. 

    
    updateMessages(message) {
        const updatedMessages = this.state.messages.slice()
        updatedMessages.push(message)
        this.setState({
            messages: updatedMessages
        })
    }

    setUserId(user) {
        this.setState(user)
    }

    sendMessage() {
        let {wpr_id, user_id} = this.props.user
        let {value} = this.refs.message
        this.socket.emit('message sent', {
            message: value,
            room: wpr_id
        })
        this.refs.message.value = '';
        axios.post('/api/messages', {value, user_id, wpr_id})
    }

    joinRoom() {
        this.socket.emit('join room', {
            room: this.props.user.wpr_id
        })
        this.setState({ messages: [...this.state.messages] })
    }

    joinSuccess(room) {
        console.log('you successfully joined room ' + room)
    }

    render(props) {
        console.log(this.state.messages)
        console.log(this.props)
        const messages = this.state.messages.map((e, i) => {
            if (e.wpr_id === this.props.user.wpr_id){
                let time = moment(e.time).subtract(5, 'hours')
            return (
                <div>
                <p key={i}>{e.name}</p>
                <p key={i}>{time.tz("America/Los_Angeles").format('LLL')}</p>
                <p key={i}>{e.message}</p>
                {/* <p key={i}>{e.wpr_id}</p> */}
                </div>  
            )} 
        })
        console.log(messages)
        return (
            <div>
                <Nav />
                <h3>Welcome to Cohort {this.props.user.wpr_id}:</h3>
                <div className='messages'>
                    {messages}
                </div>
                <div className='input'>
                    <input type="text" ref='message' />
                    <button onClick={this.sendMessage}>Send</button>
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
export default connect(mapStateToProps, {getUserData, getWpr})(Chat)