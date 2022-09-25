const express=require('express');
const { requireSignin, isAuth, isAdmin } = require('../controller/auth');

const { create } = require('../controller/category');
const { userById } = require('../controller/user');


const router=express.Router()
router.param('userid',userById)
router.post('/category/create/:userId',requireSignin,isAuth,isAdmin,create);

module.exports=router;