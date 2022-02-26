const Product = require('../models/product');
const fs = require('fs');
const path = require('path');
//                //<input type="text" name="ImgLink" id="imageUrl" value="<% if(editing) {%><%=product.imageURL%> <% }%> ">
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

  if(!req.file) {
		const error = new Error('No image provided');
		error.statusCode = 422;
		throw error;
	}
const imageURL= req.file.path.replace("\\","/");
  const product = new Product({name:req.body.Name,price:req.body.Price,description:req.body.SellerName , 	imageURL:imageURL/*req.body.ImgLink*/ ,userId:req.user}); //req.user = req.user._id
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
  let updatedImg = req.body.productImage;
	const updatedName = req.body.Name;
	const updatedPrice = req.body.Price;
	//const updatedImg =req.file.path.replace("\\","/");// req.body.ImgLink;
	const updatedDescription = req.body.SellerName;

 if (req.file) {
   updatedImg = 	req.file.path.replace("\\","/");
 }
  Product.findById(prodId).then(product =>{
    if(product.userId.toString() !== req.user._id.toString())
    {
      return res.redirect('/');
    }
	 product.name=updatedName;
   product.price=updatedPrice;
   product.description=updatedDescription;
   product.imageURL=updatedImg;
	  product.save().then( result =>{
		console.log(result);
	res.redirect('products');
}) }).catch(err => {console.log(err)});
};
exports.getProducts = (req, res, next) => {
 Product.find(/*{userId : req.user}*/).then( products => { //We can use populate or select
    res.render('admin/products', {
      prods: products,
      pageTitle:'Go shopping',
      path: '/admin/products',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true,
      isAuthenticated:req.session.loggedIn
    });
  }).catch(err => {
    console.log(err);
  });
  };

exports.postDeleteProducts = (req, res, next) => {
/*const prodId = req.body.productID;
  Product.findByIdAndRemove(prodId).then().catch(err => console.log(err));
  res.redirect('/products');*/
const prodId = req.body.productID;

	Product.findById(prodId)
    .then(product => {
      if (!product) {
        const error = new Error('Could not find post.');
        error.statusCode = 404;
        throw error;
      }
			//check the logged in user
      if(product._id === req.user._id) {
      			clearImage(product.imageURL);
      }
			return Product.deleteOne({_id : prodId , userId : req.user._id});//findByIdAndRemove(prodId);
		}).then(result => {
			console.log(result);
	  res.redirect('/products');
		}).catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

const clearImage = filePath => {
  filePath = path.join(__dirname, '..', filePath);
  fs.unlink(filePath, err => console.log(err));
};
