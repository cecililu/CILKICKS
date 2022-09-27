const errorHandler = require("../helper/dbErrorhandler");
const Product = require("../models/product");
const _=require('lodash')
const formidable=require("formidable")
const fs=require("fs");
const product = require("../models/product");

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
exports.updateProduct=(req,res)=>{
  console.log('update product runninf')
  let form=new formidable.IncomingForm()
  form.keepExtensions=true
  
  form.parse(req,(err,feilds,files)=>{
    if (err){
      return res.status(400).json({error:[err,'Image not uploaded']})

    }
  //check feilds
//    const {name,description,price,category,quantity,shipping}=feild


  let newprod=req.product 

  newprod=_.extend(newproduct,feilds)


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
      return res.json({data})
    })

    })
   
}