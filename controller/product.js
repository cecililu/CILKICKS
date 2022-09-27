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
    //files.photo.path not working
    let newprod=new Product(feilds)
    
    if (!files.photo){
      
        product.photo.data=fs.readFileSync(files.photo.filepath)
        product.photo.contentType=files.photo.mimetype
     }


     newprod.save((err,data)=>{
      if (err) return res.json({"error":err})
      return res.json({data})
    })

    })
   
}