const path=require('path');
const express=require('express');
const router=express.Router();
//const productsController = require('../controllers/products');
const shopController = require('../controllers/shop');
//const adminData =require('./admin');
//router.get('/home',productsController.getProducts);
router.get('/',shopController.homePage);
router.get('/cart',shopController.getCart);
router.post('/cart',shopController.postCart);
router.get('/products/:productId',shopController.getProduct);
//router.get('/checkout',shopController.checkout);
router.get('/details',shopController.productDetails);
router.get('/products',shopController.getProducts);
router.post('/shop/delete-product',shopController.postDeleteCart);
router.post('/shop/create-order',shopController.postOrder);
router.get('/orders',shopController.getOrders);
module.exports=router;
