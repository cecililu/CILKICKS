const express=require('express');
const { requireSignin, isAuth, isAdmin } = require('../controller/auth');

const { create, categoryById, read, readList, updateCategory, deleteCategory } = require('../controller/category');
const { userById } = require('../controller/user');


const router=express.Router()

router.post('/category/create/:userId',requireSignin ,isAuth,isAdmin,create);
router.get('/category/:categoryId',read) ;
router.get('/categories/:categoryId',readList) ;

router.delete('/category/:categoryId/:userId', requireSignin,isAuth,isAdmin,deleteCategory)
router.put('/category/:categoryId/:userId', requireSignin,isAuth,isAdmin,updateCategory)  

router.param('userId',userById)
router.param('categoryId',categoryById)

module.exports=router;