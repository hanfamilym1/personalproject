import React, {Component} from 'react'
import Nav from '../Nav/Nav'
import {Link} from 'react-router-dom'
import moment from 'moment'
import BigCalendar from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './Event.css'
import {getUserData} from '../../ducks/reducer'
import {connect} from 'react-redux'
import axios from 'axios'

class Event extends Component {
    constructor(props){
        super(props)
       
        this.state={
            events: []
        }
    }
    
    componentDidMount(){
        this.getEvents()
    }

    getEvents(){
        axios.get('/api/events').then(res=>{
            console.log(res.data)
            // this.setState({
            //     events: res.data
            // })
        })
    }

    handleSelect = ({ start, end }) => {
        const title = window.prompt('New Event name')
        if (title){
            this.setState({
                events: [
                    ...this.state.events,
                    {
                        start,
                        end,
                        title,
                    },
                ],
            })
            let {user_id} = this.props.user
          axios.post('/api/events', {user_id, end, start, title})
          this.getEvents()
      }
    }
    


    render(props){
        console.log(this.state.events)
        console.log(this.props)
        let localizer = BigCalendar.momentLocalizer(moment)
        return(
            <div class='Event'>
                <Nav/>
                <BigCalendar
                selectable
                localizer={localizer}
                events={this.state.events}
                defaultView={BigCalendar.Views.WEEK}
                startAccessor="start"
                endAccessor="end"
                scrollToTime={new Date(1970, 1, 1, 6)}
                onSelectEvent={event=> alert(event.title)}
                onSelectSlot={this.handleSelect}
                />
                <Link to='/create'><button>New Event</button></Link>
                
            </div>
        )
    }
}

function mapStateToProps(state){
    let {user } = state
    return { 
        user
    }
}
 
export default connect (mapStateToProps, {getUserData})(Event)