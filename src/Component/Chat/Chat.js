import React, { Component } from 'react'
import Nav from '../Nav/Nav'
import io from 'socket.io-client'
import axios from 'axios'

export default class Chat extends Component {
    constructor() {
        super()
        this.state = {
            userID: null,
            messages: []
        }
    }

    
    render() {
       
        return (
            <div>
                <Nav />
                Chat
            </div>
        )
    }
}