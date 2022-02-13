const Product = require('../models/product');
const User = require('../models/user');
const Cart = require('../models/cart');
exports.getProducts = (req, res, next) => {
  Product.fetchAll().then(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle:'products list',
      path: '/products',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
    });
  }).catch(err => console.log(err));
};
exports.getProduct = (req,res,next) =>{
	const prodId= req.params.productId;
Product.findById(prodId).then(product => {
		//console.log(product);
			 res.render('shop/product-detail', {
     product:product,
      pageTitle:product.Name,
      path: '/products',
    });
	}).catch(err => console.log(err));
	//res.redirect('/');
};
exports.homePage = (req, res, next) => {
  Product.fetchAll().then(products => {
  res.render('shop/index', {
	   prods: products,
    pageTitle: 'Home page',
    path: '/',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  })});
  
};
exports.productDetails = (req, res, next) => {
  Product.fetchAll().then(products => {
    res.render('shop/product-detail', {
      prods: products,
      pageTitle:'product detail',
      path: '/details',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
    });
  }).catch(err => console.log(err));
};
exports.getCart = (req, res, next) => {
	req.user.getCart().then( cartProducts=>{
  res.render('shop/cart', {
    pageTitle: 'cart page',
    path: '/cart',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
	products: cartProducts
	})}).catch(err => console.log(err));
	
};
exports.postCart = (req, res, next) => {
  prodId= req.body.productID;
  Product.findById(prodId).then(product => {
	  return req.user.addToCart(product);
  }).then(result => {console.log(result);    res.redirect('/cart');}).catch( err => console.log(err));
};
exports.checkout = (req, res, next) => {
  res.render('shop/checkout', {
    pageTitle: 'checkout',
    path: '/checkout',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
};
exports.postDeleteCart = (req, res, next) => {
  prodId= req.body.productID;
req.user.deletItemFromCart(prodId).then(result => {
	console.log(result);
	 res.redirect('/products'); 
}).catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
	req.user.getOrder().then(orders => {
		  res.render('shop/orders', {
    pageTitle: 'Orders page',
	  path: '/orders', 
	  orders:orders
	  });
	}).catch(err => console.log(err));
	
};
exports.postOrder = (req, res, next) => {
	
req.user.addOrder();
res.redirect('/');
};