const mongoConnect = require('./db.js').mongoConnect
const getDb = require('./db.js').getDb
const cors = require('cors')
const express = require('express');

const User = require('./models/user')


const app = express();
const bodyParser = require('body-parser');


app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

mongoConnect(() => {
    app.listen(1000)
})


app.get('/', (req, res) => {
    res.send('hello world')
});

app.get('/users', (req, res) => {
    const db = getDb()
    const users = db.collection('users').find().toArray()
    return users
        .then(result => {
            // console.log({ result })
            res.send(result)
        })
        .catch(err => {
            res.send("IT didn't work")
            // console.log({ err })
        })
});

app.post('/users', (req, res) => {
    const db = getDb()
    const { username, longestWordsArray, highestScoringWordsArray, gameScore } = req.body;
    const user = db.collection('users').findOne({ email: username })

    // console.log({ username, longestWordsArray, highestScoringWordsArray, gameScore });

    return user
        .then(result => {
            const submittedUser = new User(result)

            submittedUser.updateTopFiveScores(gameScore)
            submittedUser.updateTopFiveLongestWords(longestWordsArray)
            submittedUser.updateTopFiveHighestScoringWords(highestScoringWordsArray)
            submittedUser.save();
        })
        .catch(err => {
            console.log({ err })
        })

    // need to figure out how to pass info back to client
    res.write("HELLO")

})