const getDb = require('../db.js').getDb
class User {
    constructor({ email, firstName, lastName, abswordity }) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.abswordity = abswordity;
    }

    save = () => {
        const db = getDb()
        return db.collection('users').updateOne({ email: this.email }, { $set: this })
            .then(result => {
                console.log({ result })
            })
            .catch(err => {
                console.log({ err })
            })
    }

    updateTopFiveScores = (currentScore) => {
        const db = getDb()
        const previousScores = this.abswordity.scores;
        previousScores.push(currentScore);
        previousScores.sort(function (a, b) { return b - a })
        const newScores = previousScores.slice(0, 5)
        this.abswordity.scores = newScores;
        return;
    }
};

module.exports = User;