const mongoConnect = require('./db.js').mongoConnect
const getDb = require('./db.js').getDb
const cors = require('cors')
const express = require('express');

const app = express();


app.use(cors())

mongoConnect(()=>{
 app.listen(1000)
})


app.get('/', (req, res) => {
    res.send('hello world')
});

app.get('/users', (req, res) => {
    const db = getDb()
    console.log({db})
    const users = db.collection('users').find().toArray()
    return users
    .then(result => {
        console.log({result})
        res.send(result)
    })
    .catch(err => {
        res.send("IT didn't work")
        console.log({err})
    })
});