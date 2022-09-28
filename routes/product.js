const express=require('express');
const { requireSignin, isAuth, isAdmin } = require('../controller/auth');

const { create, productbyId,read, deleteProduct ,listCategories,updateProduct,listProduct,listRelated} = require('../controller/product');
const { userById } = require('../controller/user');


const router=express.Router()

router.post('/product/create/:userId',requireSignin ,isAuth,isAdmin,create);
router.get('/product/:productId',read) ;
router.delete('/product/:productId/:userId', requireSignin,isAuth,isAdmin,deleteProduct)
router.put('/product/:productId/:userId', requireSignin,isAuth,isAdmin,updateProduct)  


router.get('/products',listProduct) ;
router.get('/product/related/:productId',listRelated) ;
router.get('/product/categories',listCategories) ;

router.param('userId',userById)
router.param('productId',productbyId)

module.exports=router;