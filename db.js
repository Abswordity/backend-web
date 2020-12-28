const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;


let _db;
const mongoConnect = callback => {
    MongoClient.connect(
        'mongodb+srv://adamjgordon30:H%40mbone11235@abswordity0-hthgk.mongodb.net/test?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true }
    )
        .then(client => {
            _db = client.db('Abswordity-V1');
            callback();
        })
        .catch(err => {
            // console.log(err);
            throw err;
        });
};

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No database found!'
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;


