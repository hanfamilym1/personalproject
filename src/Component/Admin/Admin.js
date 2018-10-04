import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Admin.css'

export default class Admin extends Component {
    render() {
        return (
            <div className='admin_nav'>
                <div className='admin_container'>
                    <Link to='/settings'> <button className='shutter-out-horizontal'>SETTINGS</button></Link>
                    <Link to='/admin/change'> <button className='shutter-out-horizontal'>EDIT USERS</button></Link>
                    <Link to='/admin/data'><button className='shutter-out-horizontal'>DATA ANALYSIS</button></Link>
                </div>
            </div>
        )
    }
}