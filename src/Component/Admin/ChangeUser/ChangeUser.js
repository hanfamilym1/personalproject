import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

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

    getUsers(){
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
    
    handleText(val){
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
    
    updateUser(){
        
        let {wpr_id, user_id} = this.state
        axios.put(`/api/user/${user_id}`,{wpr_id, user_id}).then(res => this.setState({
            users: res.data,
            editToggle: false
        }))
        this.getUsers()

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
                <div>
                    <h3>Name: {name}</h3>
                    <h3>ID: {user_id}</h3>
                    <h3>WPR: {wpr_id}</h3>
                    <button value={user_id} onClick={(e) => { this.handleChange(e.target.value) }}> Edit</button>
                    <button value={user_id} onClick={(e) => this.deleteUser(e.target.value)}>Delete</button>
                </div>
            )
        })
        console.log(newUsers)

        return (
            <div>
                <Link to='/admin'><button><h3>Admin Page</h3></button></Link>
                {this.state.editToggle ? <div>
                    <select name="" id="" onChange={e=> this.handleText(e.target.value)}>
                    <option value="38">38</option>
                    <option value="39">39</option>
                    <option value="40">40</option>
                    <option value="41">41</option>
                    <option value="42">42</option>
                    </select>
                    <button onClick={(e) => this.updateUser(e.target.value)}>Save</button>
                </div>

                    : newUsers

                }
            </div>
        )
    }
}