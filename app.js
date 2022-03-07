const express = require('express')
const jwt = require('jsonwebtoken')
const fs = require('fs')

var privateKey = fs.readFileSync('private.pem')
var publicKey = fs.readFileSync('public.pem')
const PORT = 3000

const app = express()
app.use(express.json())

var token
app.post('/sign', (req, res)=>{
    token = jwt.sign(req.body, privateKey, { expiresIn: '24h' })
    res.send("tocken created for 1day")
})

app.post('/verify', (req, res)=>{
    try{
        var paylode = jwt.verify(token, publicKey, { algorithms: ['RS256'] }) // it is working fine with private key - I neet to study about how can we use differnt keys for signing and verifing ...
        res.send(paylode)
    }
    catch(e){
        res.status(400).send('token invalid')
    }
})

app.listen(PORT, ()=>console.log(`server is active on port ${PORT}`))