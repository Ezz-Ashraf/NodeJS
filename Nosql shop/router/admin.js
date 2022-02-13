const path=require('path');
const express=require('express');

const router=express.Router();
const rootDir = require('../util/path');
//const productsController = require('../controllers/products');
const adminController = require('../controllers/admin');
router.get('/admin/add-product',adminController.getAddProduct);
router.post('/admin/add-product',adminController.postAddProduct);
router.post('/admin/edit-product',adminController.postEditProduct);
router.get('/admin/edit-product/:productId',adminController.getEditProducts);
router.get('/admin/products',adminController.getProducts);
router.post('/admin/delete-product',adminController.postDeleteProducts);
module.exports.routes = router;
//module.exports.products = products;
