const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
   pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
	editing : false,
    isAuthenticated:req.session.loggedIn
  });
};

exports.postAddProduct = (req, res, next) => {
  const product = new Product({name:req.body.Name,price:req.body.Price,description:req.body.SellerName , 	imageURL:req.body.ImgLink ,userId:req.user}); //req.user = req.user._id
  product.save().then(result => {
	  console.log(result);
  res.redirect('/admin/add-product');
	  }).catch(err => console.log(err));
};
exports.getEditProducts = (req, res, next) => {
	const editMode = req.query.edit;
	const prodId= req.params.productId;
	if(!editMode)
	{
	return	res.redirect('/admin/add-product');
	}
	else {
	Product.findById(prodId).then(product => {
  res.render('admin/edit-product', {
    pageTitle: 'Edit Product',
    path: '/admin/edit-product',
	     product:product,
	editing : editMode,
  isAuthenticated:req.session.loggedIn
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
  Product.findById(prodId).then(product =>{
	 product.name=updatedName;
   product.price=updatedPrice;
   product.description=updatedDescription;
   product.imageURL=updatedImg;
	return product.save();
  }).then( result =>{
		console.log(result);
	res.redirect('products');
});
};
exports.getProducts = (req, res, next) => {
 Product.find().then( products => { //We can use populate or select
    res.render('admin/products', {
      prods: products,
      pageTitle:'Go shopping',
      path: '/admin/products',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true,
      isAuthenticated:req.session.loggedIn
    });
  });
  };

exports.postDeleteProducts = (req, res, next) => {
const prodId = req.body.productID;
  Product.findByIdAndRemove(prodId).then().catch(err => console.log(err));
  res.redirect('/products');
};
