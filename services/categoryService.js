const category = require('../models/index').Categories;

const getAllCategories = async ()=>{
    try{
    const categories = await category.findAll();
    return categories;
    }catch(err){
        console.log("Something went wrong");
        console.log(err);
    }
}

const createCategory = async (data)=>{
    try{
    const newCategory  = await category.create({
        name : data.name,
        description : data.description,
        createdAt : new Date(),
        UpdatedAt : new Date()
    })
    return newCategory;
    }catch(err){
    console.log("Something went wrong");
    console.log(err);
}
}

const deleteCategory = async (categoryId)=>{
    try{
   await category.destroy({
        where : {
            id : categoryId
        }
    })
    }catch(err){
    console.log("Something went wrong");
    console.log(err);
}
}

const findCategoryById = async(categoryID)=>{
    try{
    const getCategoryById = await category.findOne({
        where :{
            id : categoryID
        }
    })

    return getCategoryById;
    }catch(err){
    console.log("Something went wrong");
    console.log(err);
}
}


const updateCategory = async(categoryId, data)=>{
    try{
    const updatedCategory = await category.update(
        {
        name : data.name,
        description : data.description
        },
        {
        where:{
            id : categoryId
        }}
    )

    return updatedCategory;
    }catch(err){
    console.log("Something went wrong");
    console.log(err);
}
}

module.exports = {
    getAllCategories,
    createCategory,
    deleteCategory,
    findCategoryById,
    updateCategory,
}