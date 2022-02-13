const mongoose=require('mongoose')
const Schema =mongoose.Schema;

const userSchema= new Schema ({
	name:{
		type : String,
		required : true
	},
	email:{
		type  :String,
		required:true
	}
	,Upassword : {
		type: String,
		required:true
	},
	cart:{
items : [{
	productId:{ type: Schema.Types.ObjectId ,
		ref : 'Product',
required:true
	},
	quantity:{
		type:Number ,
	required:true
}
}]
	}
});
userSchema.methods.addToCart = function(product)  {
		const cartProductIndex = this.cart.items.findIndex( cp => {
			return cp.productId.toString() === product._id.toString();
		});
		let newQuantity = 1;

		const updatedCarItems = [...this.cart.items];
		if(cartProductIndex >=0)  //check if the product already exists in the cart of the user (if index >=0 so it means it is already in the array)
		{
			newQuantity = this.cart.items[cartProductIndex].quantity+1
			updatedCarItems[cartProductIndex].quantity=newQuantity;
		}
		else {
			updatedCarItems.push({
				productId : product._id,
				quantity:newQuantity
			});
		}
		const updatedCart = {
			items :updatedCarItems
		};
		this.cart=updatedCart;
		return this.save();
};

userSchema.methods.deletItemFromCart = function(prodId)  {
		const updatedCartItems = this.cart.items.filter(item =>{
			return item.productId.toString() !== prodId.toString();
		});

		this.cart.items=updatedCartItems;
		return this.save();
}

userSchema.methods.clearCart = function() {
	this.cart = {items : []};
	return this.save();
}

module.exports = mongoose.model('User',userSchema);
// const objectId =mongodb.ObjectId;
// class User {
//
// constructor(name,email,Upassword,cart,id)
// {
// 	this.name=name;
// 	this.email=email;
// 	this.Upassword=Upassword;
// 	this.cart=cart;
// 	this._id= objectId(id);
// }
// static findById(userId)
// {
// 	const db =getDb();
// return	db.collection('users').findOne({_id : new objectId(userId)});
// }
//
// addToCart(product )
// {
// 			const db = getDb();
// 	const cartProductIndex = this.cart.items.findIndex( cp => {
// 		return cp.productId.toString() === product._id.toString();
// 	});
// 	let newQuantity = 1;
//
// 	const updatedCarItems = [...this.cart.items];
// 	if(cartProductIndex >=0)  //check if the product already exists in the cart of the user (if index >=0 so it means it is already in the array)
// 	{
// 		newQuantity = this.cart.items[cartProductIndex].quantity+1
// 		updatedCarItems[cartProductIndex].quantity=newQuantity;
// 	}
// 	else {
// 		updatedCarItems.push({
// 			productId : new objectId(product._id),
// 			quantity:newQuantity
// 		});
// 	}
// 	const updatedCart = {
// 		items :updatedCarItems
// 	};
// 	return db.collection('users').updateOne(
// 	{ _id :new objectId(this._id)},
// 	{ $set : {cart : updatedCart}}
// 	);
// }
//
// getCart()
// {
// 	const db =getDb();
// 	const productIds = this.cart.items.map(i => {
// 		return i.productId;
// 	});
// 	return   db.collection('products').find({_id : {$in : productIds}}).toArray().then(products => {
// 		return products.map(p => {
// 			return {
// 				...p,quantity:this.cart.items.find(i => {
// 					return i.productId.toString() === p._id.toString();
// 				}).quantity
// 			};
// 		});
// 	});
// }
//
// deletItemFromCart(prodId)
// {
// 	const updatedCartItems = this.cart.items.filter(item =>{
// 		return item.productId.toString() !== prodId.toString();
// 	});
// 		const db =getDb();
// 		return db.collection('users').updateOne(
// 	{ _id :new objectId(this._id)},
// 	{ $set : {cart : {items :updatedCartItems} }}
// 	);
// }
// addOrder() {
//
// 	const db =getDb();
// 	this.getCart().then(products => {
// 		const order = {
// 			items: products,
// 			user :{
// 				_id: new objectId(this._id),
// 				name : this.name
// 			}
// 		};
// 		return db.collection('orders').insertOne(order);
// 	}).then(result => {
// 		this.cart={items: []};
// 	return db.collection('users').updateOne(
// 	{ _id :new objectId(this._id)},
// 	{ $set : {cart : {items :[]} }}
// 	);
// 	}).catch(err => console.log(err));
// }
// getOrder() {
// 	const db =getDb();
// 	return db.collection('orders').find({'user._id':new objectId(this._id)}).toArray();
// }
// }
// module.exports = User;
