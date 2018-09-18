import React, {Component} from 'react'
import Nav from '../Nav/Nav'
import {Link} from 'react-router-dom'

export default class Event extends Component {
    render(){
        return(
            <div>
                <Nav/>
                Event Component <br/>
                <Link to='/create'><button>New Event</button></Link>
            </div>
        )
    }
}