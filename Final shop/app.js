const path=require('path');
const express=require('express');
const bodyParse=require("body-parser");
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const rootDir = require('./util/path');
const errorFile = require('./controllers/error');
const multer = require('multer');
const User = require('./models/user');
const { v4:uuidv4 } = require('uuid');
const csrf =require('csurf');
const flash = require('connect-flash');
const mongoDBURI = '';
const app=express();
const store = new MongoDBStore({
uri : mongoDBURI,
collection:'sessions'
});
const fileStorage = multer.diskStorage({
	destination: (req , file , cb) => {
		cb(null,'images'); //null is the erroes
	},
	filename: (req,file,cb) => {
		cb(null,uuidv4())//new Date().toISOString() + '-' + file.originalname);
	}
});

const fileFilter = (req,file,cb) => {
	if(
		file.mimetype === 'image/png' ||
		file.mimetype === 'image/jpg' ||
		file.mimetype === 'image/jpeg'
	)  {
		cb(null,true)
	} else {
		cb(null , false)
	}
};
app.use(multer({ storage:fileStorage , fileFilter: fileFilter }).single('ImgLink'));
app.use('/images',express.static(path.join(__dirname,'images')));
const csrfProtection = csrf(); //The default is to use the session
app.set('view engine','ejs');
app.set('views','views');
const adminRoutes =require('./router/admin');
const shopRoutes =require('./router/shop');
const authRoutes =require('./router/auth');
app.use(bodyParse.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret:'This is a secret',resave:false, saveUninitialized: false, store:store}));
app.use(csrfProtection);
app.use(flash());
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
app.use( (req,res,next) => {
	res.locals.isAuthenticated =req.session.loggedIn;
	res.locals.csrfToken = req.csrfToken();
	next();
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
