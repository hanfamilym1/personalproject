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
        let {value, id, wpr_id} = req.body
        db.insert_messages([value, id, wpr_id]).then(chat=> res.status(200).send(chat)).catch(err=>{console.log(err)})
    },
    // getMessages: (req,res)=>{
    //     const db = req.app.get('db')
    //     db.get_messages().then(res=>res.data).catch(err=>{console.log(err)})
    // }
   
}