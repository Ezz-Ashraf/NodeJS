const Product = require('../models/product');
const User = require('../models/user');
const Order = require('../models/order');
const mongoose = require('mongoose');
exports.getProducts = (req, res, next) => {
  Product.find().then(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle:'products list',
      path: '/products',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true,
      isAuthenticated:req.session.loggedIn
    });
  }).catch(err => console.log(err));
};
exports.getProduct = (req,res,next) =>{
	const prodId= req.params.productId;
Product.findById(prodId).then(product => {
			 res.render('shop/product-detail', {
     product:product,
      pageTitle:product.Name,
      path: '/products',
      isAuthenticated:req.session.loggedIn
    });
	}).catch(err => console.log(err));
	//res.redirect('/');
};
exports.homePage = (req, res, next) => {
  Product.find().then(products => {
  res.render('shop/index', {
	   prods: products,
    pageTitle: 'Home page',
    path: '/',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  //  isAuthenticated:req.session.loggedIn,
  //  csrfToken : req.csrfToken()
  })});

};
exports.productDetails = (req, res, next) => {
  Product.find().then(products => {
    res.render('shop/product-detail', {
      prods: products,
      pageTitle:'product detail',
      path: '/details',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true,
      isAuthenticated:req.session.loggedIn
    });
  }).catch(err => console.log(err));
};
exports.getCart = (req, res, next) => {
	req.user.populate('cart.items.productId').then( user =>{
      const cartProducts=user.cart.items;
  res.render('shop/cart', {
    pageTitle: 'cart page',
    path: '/cart',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
	products: cartProducts,
  isAuthenticated:req.session.loggedIn
	})}).catch(err => console.log(err));

};
exports.postCart = (req, res, next) => {
  prodId= req.body.productID;
  Product.findById(prodId).then(product => {
	  return req.user.addToCart(product);
  }).then(result => {console.log(result);    //res.redirect('/cart');
}).catch( err => console.log(err));
};
exports.checkout = (req, res, next) => {
  res.render('shop/checkout', {
    pageTitle: 'checkout',
    path: '/checkout',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
    isAuthenticated:req.session.loggedIn
  });
};
exports.postDeleteCart = (req, res, next) => {
  prodId= req.body.productID;
req.user.deletItemFromCart(prodId).then(result => {
	console.log(result);
	 res.redirect('/cart');
}).catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
  Order.find({'user.userId' : req.user}).then(orders => {
		  res.render('shop/orders', {
    pageTitle: 'Orders page',
	  path: '/orders',
	  orders:orders,
    isAuthenticated:req.session.loggedIn
	  });
	}).catch(err => console.log(err));

};
exports.postOrder = (req, res, next) => {
  req.user.populate('cart.items.productId').then( user =>{
      const cartProducts=user.cart.items.map( i => {
        return {quantity : i.quantity , product : i.productId._doc};
      });
      const order = new Order({
        user: { name :req.user.name,
        userId:req.session.user
      },
      products :cartProducts //Mongoose automatically picks up the id
    });
    order.save();
  }).then(result => {
    req.user.clearCart();
  }).then( result =>{
      res.redirect('/');
    });

};
