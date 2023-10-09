import categoryModel from '../models/categoryModel.js';

export const getCategories = async(req, res)=>{
    try{
        const categories = await categoryModel.find();
        res.send({
            message:'succesfully fetched categories!',
            data: categories
        })

    }catch(error){
        res.send({
            message:'Error occured',
            data:error.message
        })
    }
}
  
export const getCategory = async(req, res)=>{
     try{
        const categoryId = req.params.id;
        const category = await categoryModel.findOne({ _id:categoryId});
        res.send({
            message:'succesfully fetched category!',
            data: category
        })

    }catch(error){
        res.send({
            message:'Error occured',
            data:error.message
        })
    }

}
export const createCategory = async(req, res)=>{
     try{
        const newCategory= new categoryModel({
            name: req.body.name
        });
        const category = await newCategory.save();
        res.send({
            message:'succesfully created category!',
            data: category
        })

    }catch(error){
        res.send({
            message:'Error occured',
            data:error.message
        })
    }

}
export const updateCategory = async(req, res)=>{
     try{
        const categoryId = req.params.id;
        const category = await categoryModel.findOne({ _id:categoryId});
        category.name = req.body.name;
        const updatedCategory = await category.save();
        res.send({
            message:'succesfully updated category!',
            data: updatedCategory
        })

    }catch(error){
        res.send({
            message:'Error occured',
            data:error.message
        })
    }
    
}
export const deleteCategory = async(req, res)=>{
    try{
        await categoryModel.deleteOne({_id:req.params.id})
        res.send({
            message:'succesfully deleted category!',
        })

    }catch(error){
        res.send({
            message:'Error occured',
            data:error.message
        })
    }
}