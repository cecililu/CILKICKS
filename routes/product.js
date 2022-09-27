const express=require('express');
const { requireSignin, isAuth, isAdmin } = require('../controller/auth');

const { create } = require('../controller/product');
const { userById } = require('../controller/user');


const router=express.Router()

router.post('/product/create/:userId',requireSignin ,isAuth,isAdmin,create);

router.param('userId',userById)
module.exports=router;