const errorHandler = require("../helper/dbErrorhandler");
const Product = require("../models/product");
const _=require('lodash')
const formidable=require("formidable")
const fs=require("fs");
const product = require("../models/product");

exports.create=(req,res)=>{
    let form=new formidable.IncomingForm()
    form.keepExtensions=true
    
    form.parse(req,(err,feilds,files)=>{
      if (err){
        return res.status(400).json({error:[err,'Image not uploaded']})

      }
    
    let product=new Product(feilds)
    
    if (files.photo){
        product.photo.data=fs.readFileSync(files.photo.path)
        product.photo.contentType=files.photo.type
     }
    })
    product.save((err,data)=>{
        if (err){
            return res.status(400).json({"error":[err,'product could npt be saved']})
        }
        return res.json({data}) 
       }) 
}