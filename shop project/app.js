const path=require('path');
const express=require('express');
const bodyParse=require("body-parser");
const rootDir = require('./util/path');
const errorFile = require('./controllers/error');
const db = require('./util/database');
//const expressHbs=require('express-handlebars');

const app=express();
//app.engine('handlebars',expressHbs());
//app.set('view engine','handlebars');
//app.set('view engine','pug');
app.set('view engine','ejs');
app.set('views','views');
const adminRoutes =require('./router/admin');
const shopRoutes =require('./router/shop');
db.execute('SELECT * FROM products').then(
result => {
	console.log(result[0]);
}
).catch(
err => {
	console.log(err);
}
);
app.use(bodyParse.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(path.join(rootDir, 'styling')));
app.use(adminRoutes.routes);
app.use(shopRoutes);
app.use(errorFile.get404); 
app.listen(3000);
