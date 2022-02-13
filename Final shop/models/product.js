const mongoose=require('mongoose')
const Schema =mongoose.Schema;

const productSchema= new Schema ({
	name:{
		type : String,
		required : true
	},
	price:{
		type  :Number,
		required:true
	}
	,description : {
		type: String,
		required:true
	},
	imageURL:{
		type:String,
		required:true
	},
	userId : {
		type:Schema.Types.ObjectId,
		ref:'User',
		required:true
	}
});
module.exports = mongoose.model('Product',productSchema);

// //const getDb = require('../util/database').getDb;
// const mongodb = require('mongodb');
// class Product {
//
// constructor(name,price,description,imageURL,id,userId)
// {
// 	this.name=name;
// 	this.price=price;
// 	this.description=description;
// 	this.imageURL=imageURL;
// 	this._id= id? new mongodb.ObjectId(id) : null ;
// 	this.userId= userId;
// }
// save() {
// 	const db =getDb();
// 	let dbOP;
// 	if(this._id)
// 	{
// 		//first arg is the filter
// 		dbOP = db.collection('products').updateOne({_id :this._id},{$set : this});
// 	}
// 	else
// 	{
// 		dbOP = db.collection('products').insertOne(this);
// 	}
// return	dbOP.then(result => console.log(result)).catch(err => console.log(err));
// }
//
// static fetchAll()
// {
// 	const db =getDb();
// return	db.collection('products').find().toArray().then(products =>{console.log(products);
// return products;
// }).catch(err =>console.log(err));
// }
//
// static findById(prodId)
// {
// 	const db =getDb();
// return	db.collection('products').find({_id : new mongodb.ObjectId(prodId)}).next().then(product =>{console.log(product);
// return product;
// }).catch(err =>console.log(err));
// }
//
// static deleteById(prodId)
// {
// 		const db =getDb();
// 		return db.collection('products').deleteOne({_id :new mongodb.ObjectId(prodId)}).then(result =>
// 		console.log(result)
// 		).catch(err => console.log(err));
// }
//
// }
// module.exports = Product;
