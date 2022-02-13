const path=require('path');
const express=require('express');

const router=express.Router();
const rootDir = require('../util/path');
const isAuth = require('../middleware/is-auth');
const adminController = require('../controllers/admin');
router.get('/admin/add-product',isAuth,adminController.getAddProduct);
router.post('/admin/add-product',isAuth,adminController.postAddProduct);
router.post('/admin/edit-product',isAuth,adminController.postEditProduct);
router.get('/admin/edit-product/:productId',isAuth,adminController.getEditProducts);
router.get('/admin/products',isAuth,adminController.getProducts);
router.post('/admin/delete-product',isAuth,adminController.postDeleteProducts);
module.exports.routes = router;
