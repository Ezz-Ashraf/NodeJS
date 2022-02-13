const express=require('express');
const router=express.Router();
const authController = require('../controllers/auth');

router.get('/login',authController.getLoginPage);
router.post('/login',authController.postLoginPage);
router.post('/logout',authController.postLogout);
router.post('/signup', authController.postSignup);
router.get('/signup', authController.getSignup);
module.exports=router;
