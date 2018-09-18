require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const massive = require('massive')
const session = require('express-session')
const axios = require('axios')
const ctrl = require('./controller')

app.use(bodyParser.json())
app.use(express.static( __dirname + '/../public/build'))

let {
    SESSION_SECRET,
    REACT_APP_DOMAIN,
    REACT_APP_CLIENT_ID,
    CLIENT_SECRET,
    CONNECTION_STRING,
    ENVIRONMENT
} = process.env

massive(CONNECTION_STRING).then(connection=>{app.set('db',connection)}
)
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

app.use((req,res,next)=>{
    if (ENVIRONMENT === 'dev') {
        req.app.get('db').set_data().then(userData => {
            req.session.user = userData[0]
            next();
        })
    } else {
        next()
    }
})

app.get('/auth/callback', async (req,res)=>{
    let payload = {
        client_id: REACT_APP_CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: req.query.code,
        grant_type: "authorization_code",
        redirect_uri: `http://${req.headers.host}/auth/callback`
    }
    let tokenRes = await axios.post(`https://${REACT_APP_DOMAIN}/oauth/token`, payload)
    let userRes = await axios.get(`https://${REACT_APP_DOMAIN}/userinfo?access_token=${tokenRes.data.access_token}`)
    const db = req.app.get('db')
    let { sub, name, admin } = userRes.data

    let foundUser = await db.find_user([sub])
    if(foundUser[0]){
        req.session.user = foundUser[0]
        res.redirect('/#/chat')
    } else {
        let createdUser = await db.create_user([sub, name, admin])
        req.session.user = createdUser[0]
        res.redirect('/#/wpr')
    }

})

app.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('http://localhost:3000/')
})

app.get('/api/user-data', (req, res) => {
    if(req.session.user){
        res.status(200).send(req.session.user)
    } else {
        res.status(401).send('Login please')
    }
   })

app.post('/api/user', ctrl.create)

const port = 4200


app.listen(port, ()=>{console.log(`You are connected on ${port}`)})


