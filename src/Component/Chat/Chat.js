import React, { Component } from 'react'
import Nav from '../Nav/Nav'
import io from 'socket.io-client'
import axios from 'axios'
import './Chat.css'
import { getWpr, getUserData } from '../../ducks/reducer'
import { connect } from 'react-redux'
import moment from 'moment'
import 'moment-timezone'

class Chat extends Component {
    constructor() {
        super()
        this.state = {
            userID: null,
            messages: [],
            wpr_id: null,
            user: null
        }
        this.updateMessages = this.updateMessages.bind(this)
        this.setUserId = this.setUserId.bind(this)
        this.sendMessage = this.sendMessage.bind(this)
        this.getUser = this.getUser.bind(this)
        // this.getMessages = this.getMessages.bind(this)
    }

    async componentDidMount() {
        let res = await axios.get('/api/user-data')
        // this.getUser()
        // use action creator to update redux store
        this.props.getUserData(res.data)
        this.getMessages()
        this.socket = io('/')
        this.socket.on('message dispatched', this.updateMessages)
        this.socket.on('welcome', this.setUserId)
        this.socket.on('room joined', this.joinSuccess)
        this.joinRoom()
    }

    // componentDidUpdate(prevProps){
    //     if(this.props.user.wpr_id !== prevProps.user.wpr_id){
    //         this.getMessages()
    //         this.joinRoom()
    //     }
    // }

    getUser() {
        // console.log(this.props.user.wpr_id)
        axios.get('/api/user-data').then(res => this.props.getUserData(res.data
        ))
    }

    getMessages() {
        // console.log(this.props.user.wpr_id)
        axios.get(`/api/messages/${this.props.user.wpr_id}`).then(res =>

            this.setState({
                messages: res.data
            }))
    }
    //is it working?  probably not.  I'm trying to remember how this should work. 


    updateMessages(message) {
        console.log(message)
        const updatedMessages = this.state.messages.slice()
        updatedMessages.push(message)
        this.setState({
            messages: updatedMessages
        })
        this.getMessages()
    }

    setUserId(user) {
        this.setState(user)
    }

    sendMessage() {
        let { wpr_id, id } = this.props.user
        let user_id = id
        let { value } = this.refs.message
        console.log(user_id, value, wpr_id)
        this.socket.emit('message sent', {
            message: value,
            room: wpr_id
        })
        this.refs.message.value = '';
        axios.post('/api/messages', { value, user_id, wpr_id }).then(res => this.setState({
            messages: res.data
        }))
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
        // console.log(this.state.user)

        const messages = this.state.messages.map((e, i) => {
            if (e.wpr_id === this.props.user.wpr_id) {
                let time = moment(e.time).subtract(5, 'hours')
                return (
                    <div className='message'>
                        <div className='hiddeninfo'>
                            <p className='hidden' key={i}>{e.name}</p>
                            <p className='hidden' key={i}>{time.tz("America/Los_Angeles").format('LLL')}</p>
                        </div>
                        <div className='actualmessage'>
                            <p key={i}>{e.message}</p>
                        </div>
                    </div>
                )
            }
        })
        // console.log(messages)
        return (
            <div className='chat'>
                <Nav />
                <h3 id='chat_header'>Welcome to Cohort {this.props.user.wpr_id}:</h3>
                <div className='container'>
                    <div className='messages'>
                        {messages}
                    </div>
                </div>
                <div className='input_container'>
                    <div className='input'>
                        <input placeholder='Your message' id='chat_input' type="text" ref='message' />
                        <button id='chat_button' onClick={this.sendMessage}>SEND</button>
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
export default connect(mapStateToProps, { getUserData, getWpr })(Chat)