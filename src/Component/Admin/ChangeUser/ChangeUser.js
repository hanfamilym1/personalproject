import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

export default class ChangeUser extends Component {
    constructor(props){
        super(props)
        this.state={
            users: []
        }
    }
    componentDidMount(){
        axios.get('/api/users').then(res => this.setState({
            users: res.data
        }))
    }

    deleteUser(val){
        // console.log(this.state.users.id)
        console.log(val)
        let {user_id} = this.state.users[0]
        console.log(user_id)
        // axios.delete(`/api/user/${user_id}`).then(res=> console.log(res.data))
    }

    render(){
        console.log(this.state.users)
        let newUsers = this.state.users.map(user=>{
            let { user_id, name, wpr_id, auth_id} = user
            return(
                <div>
                    <h3>Name: {name}</h3>
                    <h3>ID: {user_id}</h3>
                    <h3>WPR: {wpr_id}</h3>
                    <button>Edit</button>
                    <button onClick={(e)=>this.deleteUser(e.target.value)}>Delete</button>
                </div>
            )
        })

        return(
            <div>
                <Link to='/admin'><button><h3>Admin Page</h3></button></Link>
                {newUsers}
            </div>
        )
    }
}