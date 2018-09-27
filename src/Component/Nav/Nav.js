import React from 'react'
import {Link} from 'react-router-dom'
import './Nav.css'

export default function Nav (){
    return(
        <div className='Nav'>
            <Link to='/chat'><button className='Nav_button'>Chat</button></Link>
            <Link to='/events'><button className='Nav_button'>Event</button></Link>
            <Link to='/times'><button className='Nav_button'>Timestamp</button></Link>
            <Link to='/settings'><button className='Nav_button'>Settings</button></Link>
            <a href="http://localhost:3000/logout"><button className='Nav_button'>Logout</button></a>
        </div>
    )
}