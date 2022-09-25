const errorHandler = require("../helper/dbErrorhandler");
const Category = require("../models/catergories");


exports.create=(req,res)=>{
     const category=new Category(req.body)
     category.save((err,data)=>{
        if (err){
            return res.status(400).json({
                error:errorHandler(err)
            })
        }
         res.json({data});
     })
};