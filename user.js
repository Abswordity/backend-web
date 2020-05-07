const mongoConnect = require('./db.js').mongoConnect

	mongoConnect((db) => {
		db.collection('users').find()
		.then(response => {
    		console.log(response)
		})
		.catch(err => {
    		console.log(err)
		})
	})

