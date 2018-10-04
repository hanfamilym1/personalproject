import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './ChangeUser.css'

export default class ChangeUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            editToggle: false,
            input: '',
            wpr_id: null,
            user_id: null
        }
    }
    componentDidMount() {
        this.getUsers()
    }

    getUsers() {
        axios.get('/api/users').then(res => this.setState({
            users: res.data
        }))
    }

    handleChange(val) {
        console.log(val)
        let newuser = Number(val)
        this.setState({
            editToggle: true,
            user_id: newuser
        })

    }

    handleText(val) {
        console.log(val)
        let newWpr = Number(val)
        // console.log(newVal)
        this.setState({
            wpr_id: newWpr
        })
    }

    handleToggle() {
        this.setState({
            editToggle: true
        })
    }

    updateUser() {

        let { wpr_id, user_id } = this.state
        axios.put(`/api/user/${user_id}`, { wpr_id, user_id }).then(res => this.setState({
            users: res.data,
            editToggle: false
        }))
        // this.getUsers()

    }
    goBack() {
        this.setState({
            editToggle: false
        })
    }

    deleteUser(value) {
        // console.log(this.state.users.id)
        console.log(Number(value))
        let newValue = Number(value)
        axios.delete(`/api/user/${newValue}`).then(res => this.setState({
            users: res.data
        }))
    }

    render() {
        console.log(this.state.wpr)
        console.log(this.state.users)
        console.log(this.state.editToggle)
        let newUsers = this.state.users.map(user => {
            let { user_id, name, wpr_id, auth_id } = user
            return (
                <div className='userss'>
                    <div className='user'>
                        <h3>Name: {name}</h3>
                        <h3>ID: {user_id}</h3>
                        <h3>WPR: {wpr_id}</h3>
                        <button className='change_button' value={user_id} onClick={(e) => { this.handleChange(e.target.value) }}> Edit</button>
                        <button className='change_button' value={user_id} onClick={(e) => this.deleteUser(e.target.value)}>Delete</button>
                    </div>
                </div>
            )
        })
        console.log(newUsers)

        return (
            <div className='admin_page'>
                <div className='admin_goback'>
                    <Link to='/admin'><button className='goback'><h3>Admin Page</h3></button></Link>
                </div>
                <div className='users'>
                    {this.state.editToggle ?
                        <div className='edit_page'>
                            <div className='edit_users'>
                                <div className='edit_user'>
                                    <h3 className='label_user'><label  htmlFor="">Change the WPR </label> <br /></h3>
                                    <select name="" id="" onChange={e => this.handleText(e.target.value)}>
                                        <option value="38">38</option>
                                        <option value="39">39</option>
                                        <option value="40">40</option>
                                        <option value="41">41</option>
                                        <option value="42">42</option>
                                    </select> <br />
                                    <button onClick={(e) => this.updateUser(e.target.value)}>Save</button>
                                    <button onClick={(e) => this.goBack(e.target.value)}>Back</button>
                                </div>
                            </div>
                        </div>

                        : newUsers

                    }
                </div>
            </div>
        )
    }
}