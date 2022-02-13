const Product = require('../models/product');
const Cart = require('../models/cart');
exports.getProducts = (req, res, next) => {
	Product.findAll().then(products => {
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
	//Here products are in an array
	Product.findAll({where : {id:prodId}}).then(products => {
	////single product
	//Product.findByPk(prodId).then((product) =>{
			 res.render('shop/product-detail', {
     product:products[0],//product,
      pageTitle:products[0].Name,
      path: '/products',
	})
	}).catch(err => console.log (err))
		//console.log(product);
	
   
};
exports.homePage = (req, res, next) => {
	Product.findAll().then(products => {
		  res.render('shop/index', {
     prods: products,
      pageTitle:'products list',
      path: '/',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
    });
	}).catch(err => {
		console.log(err);
	} );
 // Product.fetchAll().then(([rows , fieldData]) => {

  //}).catch(err => console.log(err));
  
};
exports.productDetails = (req, res, next) => {
  Product.fetchAll().then(([rows , fieldData]) => {
    res.render('shop/product-detail', {
  prods: rows,
      pageTitle:'product detail',
      path: '/details',
       hasProducts: rows.length > 0,
      activeShop: true,
      productCSS: true
    });
  }).catch(err => console.log(err))
};
exports.getCart = (req, res, next) => {
	req.user.getCart().then(cart => {
	return cart.getProducts();}).then(cartProducts => {
	  res.render('shop/cart', {
    pageTitle: 'cart page',
    path: '/cart',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
	products: cartProducts
	}); }).catch(err => {console.log(err);});	
	/*console.log(cart);
	}).catch(err => {
		console.log(err);
	});*/
	
/*	const cartProducts = [];
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
  });*/
};
exports.postCart = (req, res, next) => {
 /* prodId= req.body.productID;
  Product.findById(prodId ,(product) =>{
  Cart.addProduct(prodId,product.price) ;
 
  });
   res.redirect('/'); */
    prodId= req.body.productID;
	let fetchedCart ;
		let newQuantity = 1;
	req.user.getCart().then(
	cart => {
		fetchedCart = cart;
		return cart.getProducts({ where: {id : prodId}});
	}
	).then(
	products =>
	{
		let product;
		if(products.length >0 )
		{
			product = products[0];
		}
		if(product)
		{
			let oldQuantity = product.cartItem.quantity;
			newQuantity = oldQuantity +1;
			return product;
		}
	return Product.findByPk(prodId)
	}).then(
		data => {
			return fetchedCart.addProduct(data, { through : {quantity : newQuantity} });
		}).then(result =>{
	
	res.redirect('/');
	}
	)
		.catch(err => console.log(err));

};
/*exports.checkout = (req, res, next) => {
  res.render('shop/checkout', {
    pageTitle: 'checkout',
    path: '/checkout',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
};*/
exports.postDeleteCart = (req, res, next) => {
  prodId= req.body.productID;
  req.user.getCart().then(cart =>{
	  return cart.getProducts({where : {id : prodId}});
  }).then(products =>{
	  const product = products[0];
	  return product.cartItem.destroy();
  }).then(result => {
	    res.redirect('/cart'); 
  }).catch(err => console.log(err));
 // Product.findById(prodId ,(product) =>{
  //Cart.deleteProduct(prodId,product.price);
  //});
};
exports.getOrders = (req, res, next) => {
	req.user.getOrders({include : ['products']}).then(orders => {
		  res.render('shop/orders', {
    pageTitle: 'Orders page',
	  path: '/orders', 
	  orders:orders
	  });
	}).catch(err => console.log(err));
	
};
exports.postOrder = (req, res, next) => {
	let fetchedCart;
req.user.getCart().then(
cart => {
	fetchedCart = cart;
	return cart.getProducts();
}
).then(products =>{
	return req.user.createOrder().then(order =>{
	order.addProducts(products.map(product => {
		product.orderItem = { quantity : product.cartItem.quantity}
		return product;
	}));
	}
	).catch(err => console.log(err))
}).then( result => {
	return fetchedCart.setProducts(null);
}).then(result => {
	console.log(result);
	 res.redirect('/');
}).catch(err => console.log(err));
};