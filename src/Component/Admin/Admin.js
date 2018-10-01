import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class Admin extends Component {
    render(){
        return(
            <div>
                <Link to='/settings'> <button>Settings</button></Link>
               <Link to='/admin/change'> <button>Edit Users</button></Link>
                <Link to='/admin/data'><button>Data Analysis</button></Link>
            </div>
        )
    }
}