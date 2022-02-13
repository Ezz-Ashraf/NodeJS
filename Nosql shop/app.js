const path=require('path');
const express=require('express');
const bodyParse=require("body-parser");
const rootDir = require('./util/path');
const errorFile = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');
//const expressHbs=require('express-handlebars');

const app=express();
app.set('view engine','ejs');
app.set('views','views');
const adminRoutes =require('./router/admin');
const shopRoutes =require('./router/shop');

app.use(bodyParse.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use((req , res ,next) => {
	User.findById("62056f901946e364e3c40536") //id is included in the database
	.then(user =>{
		req.user=new User(user.name,user.email,user.Upassword,user.cart,user._id);
		next();
	}).catch(err => console.log(err));
});
app.use(adminRoutes.routes);
app.use(shopRoutes);
app.use(errorFile.get404); 
mongoConnect(() => {
	app.listen(3000);
});

