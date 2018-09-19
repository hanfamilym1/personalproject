import React, { Component } from 'react'
import Nav from '../Nav/Nav'
import io from 'socket.io-client'
import axios from 'axios'
import './Chat.css'
import { getWpr, getUserData } from '../../ducks/reducer'
import { connect } from 'react-redux'

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
    }

    async componentDidMount() {
        let res = await axios.get('/api/user-data')
        // use action creator to update redux store
        this.props.getUserData(res.data)
        this.socket = io('/')
        this.socket.on('message dispatched', this.updateMessages)
        this.socket.on('welcome', this.setUserId)
        this.socket.on('room joined', this.joinSuccess)
        this.joinRoom()
    }

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
        this.socket.emit('message sent', {
            message: this.refs.message.value,
            room: this.props.user.wpr_id
        })
        this.refs.message.value = '';
    }

    joinRoom() {
        this.socket.emit('join room', {
            room: this.props.user.wpr_id
        })
        this.setState({ messages: [] })
    }

    joinSuccess(room) {
        console.log('you successfully joined room ' + room)
    }

    render(props) {

        console.log(this.props)
        const messages = this.state.messages.map((e, i) => {
            return (
                <p key={i}>{e.message}</p>
            )
        })
        console.log(messages)
        return (
            <div>
                <Nav />
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