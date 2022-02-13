const mongodb = require('mongodb');
const MongoClient =mongodb.MongoClient;

let _db; //The underscore indicates that this variable will only be used internally in this file 
const mongoConnect =(callback) => {
//MongoClient.connect('mongodb+srv://Ezz:1234@cluster0.x01bh.mongodb.net/shop?retryWrites=true&w=majority').then(client => 
MongoClient.connect('mongodb+srv://Ezz:1234@cluster0.ghrh0.mongodb.net/shop?retryWrites=true&w=majority').then(client => 
{console.log('connected');
_db = client.db();
callback();
}).catch(err => {console.log(err)
throw err;
});
}

const getDb = () => {
	if(_db)
		return _db;
	throw  'No database Found';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
//mongodb+srv://Ezz:<password>@cluster0