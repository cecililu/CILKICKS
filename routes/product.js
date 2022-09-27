const express=require('express');
const { requireSignin, isAuth, isAdmin } = require('../controller/auth');

const { create, productbyId ,read} = require('../controller/product');
const { userById } = require('../controller/user');


const router=express.Router()

router.post('/product/create/:userId',requireSignin ,isAuth,isAdmin,create);
router.get('.product/:productId',read) 
router.param('userId',userById)
router.param('product',productbyId)


module.exports=router;