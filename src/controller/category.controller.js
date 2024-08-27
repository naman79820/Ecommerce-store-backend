const Category = require("../models/category.model")

const createCategory = async (req,res)=>{
    try{
        const {name} = req.body

        const category = new Category({name})
        await category.save()
        res.status(201).json(category)
    }
    catch(error){
       res.status(400).json({message: error.message})
    }
}

const getAllCategories = async (req,res)=>{
    try{
        const categories = await Category.find()
        res.json(categories)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

const updateCategoryById = async (req,res)=>{
    try{

        const {id} = req.params
        const {name}=req.body

        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            { name },
            { new: true } 
        )
        if (!updatedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.json(updatedCategory);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}
const deleteCategoryId = async(req, res) =>{

    try{
      const {id} = req.params
      const deletedCategory = await Category.findByIdAndDelete(id)
      
      if(!deletedCategory) {
        res.status(404).json({message: "category not found"})
      }
      res.status(200).json({ message: "Category deleted successfully" });
      
    }
   
    catch(error){
      res.status(500).json({message:"internal server error"})
    }
    }
   


module.exports = {createCategory , getAllCategories , updateCategoryById , deleteCategoryId}