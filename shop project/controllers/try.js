//const products = [];
const Product =require('../models/product');
getAddProduct = (req,res,next) =>{
// res.sendFile(path.join(rootDir, 'view', 'add-product.html'));
	console.log("please enter the product name");
	//	res.render('b-layout');

		res.render('add-product',{docTitle:'Add Product'});
	
//	res.sendFile(path.join(__dirname,'../','view','add-product.html'));

};
postAddProduct= (req,res,next) =>{
		const product = new Product(req.body.Name,req.body.Price,req.body.SellerName);
		product.save();
//	console.log(req.body.productName);
//products.push({ Name: req.body.Name,Price : req.body.Price,SellerName : req.body.SellerName,ImgName : req.body.ImgLink});

res.redirect('/home');
	//res.send("<h1>Request added</h1>");
}; 
showProducts = (req,res,next) =>{
	//console.log('shop js : ',adminData.products);
	//const products=adminData.products;
	console.log("the default middleware");
	//res.sendFile(path.join(__dirname,'..','view','shop.html'));
	Product.fetchAll( products => {res.render('shop',{prods:products,docTitle:'Go shopping'});});
	//console.log(products[0].Name);
};
exports.showProduct= showProducts;
exports.getProduct= getAddProduct;
exports.postProduct= postAddProduct;