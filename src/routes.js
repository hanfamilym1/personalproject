import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Home from './Component/Home/Home'
import Timestamp from './Component/Timestamp/Timestamp'
import Events from './Component/Event/Event'
import Chat from './Component/Chat/Chat'
import Wpr from './Component/Wpr/Wpr'
import Create from './Component/Event/Create/Create'
import Settings from './Component/Nav/Settings/Settings'
import Admin from './Component/Admin/Admin'
import ChangeUser from './Component/Admin/ChangeUser/ChangeUser'
import Data from './Component/Admin/Data/Data'


export default <Switch>
    <Route path='/' component={Home} exact/>
    <Route path='/wpr' component={Wpr}/>
    <Route path='/chat' component={Chat}/>
    <Route path='/events' component={Events}/>
    <Route path='/times' component={Timestamp}/>
    <Route path='/create' component={Create}/>
    <Route path='/settings' component={Settings}/>
    <Route exact path='/admin' component={Admin}/>
    <Route path='/admin/change' component={ChangeUser}/>
    <Route path='/admin/data' component={Data}/>
</Switch>