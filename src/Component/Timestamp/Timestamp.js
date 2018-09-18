import React, {Component} from 'react'
import Nav from '../Nav/Nav'

export default class Timestamp extends Component {
    render(){
        return(
            <div>
                <Nav/>
                <h2>How long have you been at DevMountain outside of class?</h2>
                <button>Clock In</button>
                <button>Clock Out</button>
            </div>
        )
    }
}