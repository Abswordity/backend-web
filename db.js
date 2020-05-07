const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = callback => {
	MongoClient.connect(
    	'mongodb+srv://adamjgordon30:H%40mbone11235@abswordity0-hthgk.mongodb.net/test?retryWrites=true&w=majority'
  	)
    .then(client => {
        const _db = client.db('Abswordity-V1');
        callback(_db);
    })
    .catch(err => {
        console.log(err);
        throw err;
    });
};

exports.mongoConnect = mongoConnect;


