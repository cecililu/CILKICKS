const errorHandler = require("../helper/dbErrorhandler");
const Category = require("../models/catergories");



exports.categoryById=(req,res,next,id)=>{

    Category.findById(id).exec((err,cate)=>{ 
     
      if(err|| !cate){
       
        return res.status(400).json({error:['not found category'  ]})
     }
     
      req.category=category
      console.log('procuct id running')
      next()
    })
  }


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


exports.read=(req,res)=>{
      res.json({category:req.category})
}


exports.readList=(req,res)=>{
    Category.find().exec((err,data)=>{
       if(err){
        return res.status(400).json({
            error:errorHandler
        })

       }
       res.json({data})
    })
    
}



exports.deleteCategory=(req,res,next)=>{
    const category=req.category
    // category.name=req.body.name

    category.remove((err,data)=>{
        if(err){
            return res.status(400).json({error:errorHandler(err)})
        }
        res.json({message:"category deleted"})
    })


}
 

exports.updateCategory=(req,res,next)=>{
    
    const category=req.category
    category.name=req.body.name

    category.save((err,data)=>{
        if(err){
            return res.status(400).json({error:errorHandler(err)})
        }
        res.json(data)
    })
}