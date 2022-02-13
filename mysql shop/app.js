const path=require('path');
const express=require('express');
const bodyParse=require("body-parser");
const rootDir = require('./util/path');
const errorFile = require('./controllers/error');
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');
//const expressHbs=require('express-handlebars');

const app=express();
//app.engine('handlebars',expressHbs());
//app.set('view engine','handlebars');
//app.set('view engine','pug');
app.set('view engine','ejs');
app.set('views','views');
const adminRoutes =require('./router/admin');
const shopRoutes =require('./router/shop');

app.use(bodyParse.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(path.join(rootDir, 'styling')));

app.use((req,res,next) => {
	User.findByPk(1).then(user => {
		req.user = user;
		next();
	}).catch(err =>console.log(err));
})
Product.belongsTo(User,{constraints:true, onDelete: 'CASCADE'});
// or
 User.hasMany(Product);
 User.hasOne(Cart);
 Cart.belongsTo(User);
 Cart.belongsToMany(Product,{through : CartItem});
 Product.belongsToMany(Cart,{through : CartItem});
  Order.belongsTo(User);
  User.hasMany(Order);
   Order.belongsToMany(Product,{through : OrderItem});
app.use(adminRoutes.routes);
app.use(shopRoutes);
app.use(errorFile.get404);
sequelize
//.sync({force:true}).then( result => {
.sync().then( result => {
	return User.findByPk(1);
}).then(user =>{
	if(!user) {
		return User.create({name:'Ezz',email:'ezz@NODEJS.com'});
	}
	return user
})
.then(
user => {
//	console.log(user);
return user.createCart();
}
).then( cart =>
{
	app.listen(3000);	
}
).catch(
err => {
	console.log(err);
}
);
