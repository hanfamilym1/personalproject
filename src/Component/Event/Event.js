import React, {Component} from 'react'
import Nav from '../Nav/Nav'
import {Link} from 'react-router-dom'
import moment from 'moment'
import WeekCalendar from 'react-week-calendar';
import 'react-week-calendar/dist/style.less';
 
export default class Event extends Component {
    render(){
        return(
            <div>
                <Nav/>
                <WeekCalendar/>
                <Link to='/create'><button>New Event</button></Link>
                
            </div>
        )
    }
}