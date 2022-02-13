const Product = require('../models/product');
const Cart = require('../models/cart');
exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle:'products list',
      path: '/products',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
    });
  });
};
exports.getProduct = (req,res,next) =>{
	const prodId= req.params.productId;
	Product.findById(prodId,product => {
		//console.log(product);
			 res.render('shop/product-detail', {
     product:product,
      pageTitle:product.Name,
      path: '/products',
    });
	});
	//res.redirect('/');
};
exports.homePage = (req, res, next) => {
	Product.fetchAll(products => {
  res.render('shop/index', {
	   prods: products,
    pageTitle: 'Home page',
    path: '/',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
	    });
  });
};
exports.productDetails = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-detail', {
      prods: products,
      pageTitle:'product detail',
      path: '/details',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
    });
  });
};
exports.getCart = (req, res, next) => {
	const cartProducts = [];
	Cart.getCart(cart =>{
		Product.fetchAll(products =>{	
		for(product of products) {
			const cartProductData = cart.products.find(prod => prod.id === product.id);
			if(cartProductData) {
				cartProducts.push({productData: product , qty:cartProductData.qty});
			}
		}
  res.render('shop/cart', {
    pageTitle: 'cart page',
    path: '/cart',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
	products: cartProducts
  });
		} );
  });
};
exports.postCart = (req, res, next) => {
  prodId= req.body.productID;
  Product.findById(prodId ,(product) =>{
  Cart.addProduct(prodId,product.price) ;
 
  });
   res.redirect('/');
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
  Product.findById(prodId ,(product) =>{
  Cart.deleteProduct(prodId,product.price);
  res.redirect('/cart'); 
  });
};