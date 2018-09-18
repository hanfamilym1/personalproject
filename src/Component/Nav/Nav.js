import React from 'react'
import {Link} from 'react-router-dom'

export default function Nav (){
    return(
        <div>
            <Link to='/chat'><button>Chat</button></Link>
            <Link to='/events'><button>Event</button></Link>
            <Link to='/times'><button>Timestamp</button></Link>
            <Link to='/settings'><button>Settings</button></Link>
        </div>
    )
}