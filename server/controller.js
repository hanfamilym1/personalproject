module.exports={
    create: (req,res)=>{
        const db = req.app.get('db')
        console.log(req.body)
        let {id, newWpr} = req.body
        db.insert_user_wpr([id, newWpr]).then(attach=>res.status(200).send(attach)).catch(err=>{console.log(err)})
    }
}