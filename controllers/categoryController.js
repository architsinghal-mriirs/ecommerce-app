const categoryService = require('../services/categoryService');

const getCategory = async (req,res) =>{
    try{
    const response = await categoryService.getAllCategories();
    res.json({
        message : "Successfull get",
        success : true,
        code : 200,
        data : response
    })
    }catch(err){
    console.log("Something went wrong");
    console.log(err);
}
}

const createCategory = async(req,res) => {
    try{
    const createResponse = await categoryService.createCategory(req.body);
    res.json({
        message: "Successfully created the category",
        data : createResponse
    })
}catch(err){
    console.log("Something went wrong");
    console.log(err);
}
}

const deleteCategory = async(req,res) => {
    try{
    await categoryService.deleteCategory(req.params.id);
    res.json({
        message : "Successfully deleted the category"
    })
}catch(err){
    console.log("Something went wrong");
    console.log(err);
}
}

const getCategoryById = async(req,res) => {
    try{
    const categoryByID = await categoryService.findCategoryById(req.params.id);
    res.json({
        message : "Successfully fetched the category by ID",
        newCategory : categoryByID
    })
}catch(err){
    console.log("Something went wrong");
    console.log(err);
}
}


const updateCategoryById = async(req,res) => {
    try{
    const updatedCategory = await categoryService.updateCategory(req.params.id, req.body);
    res.json({
        message : "Succesfully update the category by ID",
        UpdatedCategory : updatedCategory
    })
}catch(err){
    console.log("Something went wrong");
    console.log(err);
}
}



module.exports = {
    getCategory,
    createCategory,
    deleteCategory,
    getCategoryById,
    updateCategoryById
}