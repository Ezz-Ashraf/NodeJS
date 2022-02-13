const Product = require('../models/product');

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
  const product = new Product(req.body.Name,req.body.Price,req.body.SellerName , req.body.ImgLink,null,req.user._id);
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
	const updatedProduct = new Product(updatedName,updatedPrice,updatedDescription,updatedImg,prodId);
	updatedProduct.save().then( result =>{
		console.log(result);
	res.redirect('products');
});
};
exports.getProducts = (req, res, next) => {
 Product.fetchAll().then( products => {
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
  Product.deleteById(prodId).then().catch(err => console.log(err));
  res.redirect('/products');
};