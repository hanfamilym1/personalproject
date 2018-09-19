import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class Create extends Component {
    render(){
        return(
            <div>
                <label htmlFor="">Date: </label>
                <input type="date"/> <br/>
                <label htmlFor="">Time: </label>
                <input type="time"/> <br/>
                <label htmlFor="">Where?</label>
                <select name="" id="">
                <option value="timpanogos">Timpanogos</option>
                <option value="timpanogos">Timpanogos</option>
                <option value="timpanogos">Timpanogos</option>
                <option value="timpanogos">Timpanogos</option>
                </select> <br/>
                <label htmlFor="">Description:</label>
                <input type="text"/> <br/>
                <Link to='/events'><button>Create</button></Link>
            </div>
        )
    }
}