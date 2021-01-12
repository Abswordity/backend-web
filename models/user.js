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
        const previousScores = this.abswordity.scores;
        previousScores.push(currentScore);
        previousScores.sort(function (a, b) { return b - a })
        const newScores = previousScores.slice(0, 5)
        this.abswordity.scores = newScores;
        return;
    }

    updateTopFiveLongestWords = (longestWordsArray) => {
        const previousLongestWords = this.abswordity.longestWords;
        const combinedArray = previousLongestWords.concat(longestWordsArray);
        combinedArray.sort(function (a, b) { return b.length - a.length })
        const newLongestWords = combinedArray.slice(0,5)
        this.abswordity.longestWords = newLongestWords;
        return;
    }

    updateTopFiveHighestScoringWords = (highestScoringWordsArray) => {
        const previousHighestScoringWords = this.abswordity.highestScoringWords;
        const combinedArray = previousHighestScoringWords.concat(highestScoringWordsArray);
        combinedArray.sort(function (a, b) { return b.score - a.score });
        const newHighestScoringWords = combinedArray.slice(0,5)
        this.abswordity.highestScoringWords = newHighestScoringWords;
        return;
    }
};

module.exports = User;