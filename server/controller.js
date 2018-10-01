module.exports={
    create: (req,res)=>{
        const db = req.app.get('db')
        console.log(req.body)
        let {id, newWpr} = req.body
        db.insert_user_wpr([id, newWpr]).then(attach=>res.status(200).send(attach)).catch(err=>{console.log(err)})
    },
    messages: (req,res)=>{
        const db = req.app.get('db')
        console.log(req.body)
        let {value, user_id, wpr_id} = req.body
        db.insert_messages([value, user_id, wpr_id]).then(chat=> res.status(200).send(chat)).catch(err=>{console.log(err)})
    },
    getMessages: (req,res)=>{
        const db = req.app.get('db')
        console.log(req.params)
        let {id} = req.params
        db.get_messages([id]).then(messages=> 
            res.status(200).send(messages)
        ).catch(err=>{console.log(err)})
    },
    time: (req,res)=>{
        const db = req.app.get('db')
        console.log(req.body)
        let {user_id, clock_in} = req.body
        db.insert_time([user_id,clock_in]).then(times=>
        res.status(200).send(times)).catch(err=>{console.log(err)})
    },
    getTimes: (req,res)=>{
        const db = req.app.get('db')
        console.log(req.session)
        db.get_times([req.session.user.user_id]).then(times=> res.status(200).send(times)).catch(err=>console.log(err))
        },
    events: (req,res)=>{
        const db = req.app.get('db')
        console.log(req.body)
        let {user_id, end, start, title} = req.body
        db.insert_events([user_id, end, start, title]).then(event =>
        res.status(200).send(event)).catch(err=>{console.log(err)})
    },
    getEvents: (req, res)=>{
        const db = req.app.get('db')
        db.get_events().then(events=>
            res.status(200).send(events)
        ).catch(err=>console.log(err))
    },
    getUsers: (req,res)=>{
        const db = req.app.get('db')
        db.get_users().then(users=> res.status(200).send(users)).catch(err=>console.log(err))    
    },
    deleteUser: (req,res)=>{
        const db = req.app.get('db')
        console.log(req.params)
    }

   
}