const errorHandler = require("../helper/dbErrorhandler");
const Product = require("../models/product");
const _=require('lodash')
const formidable=require("formidable")
const fs=require("fs");
const product = require("../models/product");




//get product by id middle ware that populates req.product with the product object
exports.productbyId=(req,res,next,id)=>{

  Product.findById(id).exec((err,product)=>{ 
   
    if(err|| !product){
     
      return res.status(400).json({error:['not found product',err]})
   }
   
    req.product=product
    console.log('procuct id running')
    next()
  })
}


//reads product based on id
exports.read=(req,res)=>{
  req.product.photo=undefined
   return res.json(req.product)
}
exports.deleteProduct=(req,res)=>{
  let product=req.product
  product.remove((err,deletedProduct)=>{
    if(err){
      return res.json({"error":errorHandler(err)})
    }
    return res.json({
      deletedProduct,
      message:"product deleted"
    })

  })
}


exports.create=(req,res)=>{
    let form=new formidable.IncomingForm()
    form.keepExtensions=true
    
    form.parse(req,(err,feilds,files)=>{
      if (err){
        return res.status(400).json({error:[err,'Image not uploaded']})

      }
    //check feilds
 //    const {name,description,price,category,quantity,shipping}=feild
 

    let newprod=new Product(feilds)
    console.log()
    if (files.photo){
      if (files.photo.size>1000000){
        return res.status(400).json({
          error:"image should be less than 1MB"
        })
      }
      // console.log("fs.readFileSync(files.photo.filepath)")
        newprod.photo.data= fs.readFileSync(files.photo.filepath)
        newprod.photo.contentType=files.photo.mimetype
     }


     newprod.save((err,data)=>{
      if (err) return res.json({
        err})
        data.photo=undefined
      return res.json({data})
    })

    })
   
}


exports.updateProduct=(req,res)=>{
  let form=new formidable.IncomingForm()
  form.keepExtensions=true
  
  form.parse(req,(err,feilds,files)=>{
    if (err){
      return res.status(400).json({error:[err,'Image not uploaded']})

    }
  //check feilds
//    const {name,description,price,category,quantity,shipping}=feild

    let newprod=req.product 

    newprod=_.extend(newprod,feilds)
  
  if (files.photo){
    if (files.photo.size>1000000){
      return res.status(400).json({
        error:"image should be less than 1MB"
      })
    }
    // console.log("fs.readFileSync(files.photo.filepath)")
      newprod.photo.data= fs.readFileSync(files.photo.filepath)
      newprod.photo.contentType=files.photo.mimetype
   }


   newprod.save((err,data)=>{
    if (err) return res.json({
      err})
    return res.json({data})
  })

  })
 
}
// sell && arrival
//sell=/product?sortBy=sold&order=desc&limit=4
//arrival= /product?sortBy=createdAt&order=desc&limit=4

exports.listProduct=(req,res)=>{
    let order= req.query.order?req.query.order:'asc';
    let sortBy= req.query.sortBy?req.query.sortBy:'_id';
    let limit= req.query.limit?req.query.limit:'6';
    
    Product.find()
    .select('-photo')
    .populate('category')
    .sort([[sortBy,order]])
    .limit(limit)
    .exec((err,data)=>{
      if (err) return res.status(400).json({error:'product not found'})
      return res.json(data)
    })

  }




exports.listRelated=(req,res)=>{
    let limit= req.query.limit?req.query.limit:'100';
     Product.find({_id:{$ne:req.product},category:req.product.category})
     .select('-photo')
    .limit(limit)
    .populate('category','_id name')
      .exec((err,data)=>{
      if (err) return res.status(400).json({error:'related not found'})
      return res.json(data)
    })

  }


exports.listCategories=(req,res)=>{
  Product.distinct('category',{},(err,product)=>{
    if (err) return res.status(400).json({error:'Category  not found'})
      return res.json(product)

  })
}
