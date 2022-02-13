const path=require('path');
const express=require('express');
const bodyParse=require("body-parser");
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const rootDir = require('./util/path');
const errorFile = require('./controllers/error');
const User = require('./models/user');
const mongoDBURI = 'mongodb+srv://Ezz:1234@cluster0.ghrh0.mongodb.net/shop?retryWrites=true&w=majority';
const app=express();
const store = new MongoDBStore({
uri : mongoDBURI,
collection:'sessions'
});
app.set('view engine','ejs');
app.set('views','views');
const adminRoutes =require('./router/admin');
const shopRoutes =require('./router/shop');
const authRoutes =require('./router/auth');

app.use(bodyParse.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret:'This is a secret',resave:false, saveUninitialized: false, store:store}));
app.use((req , res ,next) => {
	if (!req.session.user) {
		return next();
	}
	User.findById(req.session.user._id)
	.then(user =>{
		req.user=user;
		next();
	}).catch(err => console.log(err));
});
app.use(adminRoutes.routes);
app.use(shopRoutes);
app.use(authRoutes);
app.use(errorFile.get404);
mongoose.connect(mongoDBURI).then(result => {
	// User.findOne().then(user => {
	// 	if(!user) {
	// 		const user = new User({
	// 			name:'ezz',
	// 			email:'ezzAshraf@mail.com',
	// 			Upassword:'123',
	// 			cart: {items:[
	//
	// 			]}
	// 		});
	// 		user.save();
	// 	}
//	})

	app.listen(3000);
}).catch(err =>console.log(err));
