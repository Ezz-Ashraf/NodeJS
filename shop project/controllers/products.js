const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    docTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
};

exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.Name,req.body.Price,req.body.SellerName);
  product.save();
  res.redirect('/home');
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      docTitle:'Go shopping',
      path: '/home',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
    });
  });
};
