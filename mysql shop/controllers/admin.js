const Product = require('../models/product');
const User = require('../models/user');
//Product.belongsTo(User,{constraints:true, onDelete: 'CASCADE'});
const Sequelize = require('sequelize');
exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
   pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
	editing : false
  });
};

exports.postAddProduct = (req, res, next) => {
const name = req.body.Name;
const price = req.body.Price;
const description = req.body.SellerName;
const imageURL =  req.body.ImgLink;
//  const product = new Product(null,req.body.Name,req.body.Price,req.body.SellerName , req.body.ImgLink);
 // product.save().then(() => { res.redirect('/products');}).catch((err) => {console.log(err)});
//Product.createProduct({
 Product.create({
	name : name,
	price : price,
	imageURL : imageURL,
	description : description,
	userId:req.user.id
 }).then(result => {console.log(result);
 res.redirect('/');
 }).catch(err =>{ console.log(err);});
};
exports.getEditProducts = (req, res, next) => {
	const editMode = req.query.edit;
	const prodId= req.params.productId;
	if(!editMode)
	{
	return	res.redirect('/admin/add-product');
	}
	else {
//	req.user.getProducts({where:{id : prodId}})
	//we can use this method too
	Product.findByPk(prodId)
	.then(product => {
  res.render('admin/edit-product', {
    pageTitle: 'Edit Product',
    path: '/admin/edit-product',
	     product:product,
	editing : editMode
  });
  }).catch(err => console.log(err));
	}
};
exports.postEditProduct= (req, res, next) => {
	const prodId = req.body.productID;
	const updatedName = req.body.Name;
	const updatedPrice = req.body.Price;
	const updatedImg = req.body.ImgLink;
	const updatedDescription = req.body.SellerName;
	//const updatedProduct = new Product(prodId,updatedName,updatedPrice,updatedDescription,updatedImg);
	Product.findByPk(prodId).then(
	product =>
	{
		product.name=updatedName;
		product.price=updatedPrice;
		product.imageURL=updatedImg;
		product.description=updatedDescription;
		return product.save();
	}
	).then(result =>{
		console.log(result);
		res.redirect('products');
	
	}).catch(err => console.log(err));

	
};
exports.getProducts = (req, res, next) => {
//  Product.fetchAll(products => {
Product.findAll().then(products => {  
  res.render('admin/products', {
      prods: products,
      pageTitle:'Go shopping',
      path: '/admin/products',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
    });
  });
};
exports.postDeleteProducts = (req, res, next) => {
const prodId = req.body.productID;
 // Product.deleteById(prodId);
   Product.findByPk(prodId).then(
   product =>
   {
	   return product.destroy();
   }
   ).then(result =>{
	   console.log("product Deleted succesfully!");
	     res.redirect('/products');
   }).catch(err => console.log(err));
};