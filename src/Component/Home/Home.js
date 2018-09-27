import React, {Component} from 'react'
import logo from './DevBuddy.png'
// import {Link} from 'react-router-dom'
import './Home.css'

export default class Home extends Component {
    constructor(props){
        super(props)
    }

    login(){
        let {REACT_APP_DOMAIN, REACT_APP_CLIENT_ID} = process.env
        let url = `${encodeURIComponent(window.location.origin)}/auth/callback`
        window.location = `https://${REACT_APP_DOMAIN}/authorize?client_id=${REACT_APP_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${url}&response_type=code`
    }

    render(){
        return(
            <div className='Home'>
                <img id='home_image' src={logo} alt=""/><br/>
                <button id='home_button' onClick={this.login}><h1>LOGIN</h1></button>
            </div>
        )
    }
}