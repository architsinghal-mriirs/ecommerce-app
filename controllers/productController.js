const Products = require('../services/productService');

const getProducts = async(req,res) => {
    try{
    const Product = await Products.getProducts(req.query);
    return res.json({
        message : "Succesfully fetched all products",
        code : 200,
        success : true,
        data : Product
    })
}catch(err){
    console.log("Something went wrong");
    console.log(err);
}
}

const createProducts = async(req,res) => {
    try{
    const Product = await Products.createProducts(req.body);
    res.json({
        message : "Successfully created the product",
        code : 200,
        sucess : true,
        data : Product
    })
}catch(err){
    console.log("Something went wrong");
    console.log(err);
}
}

const updateProducts = async(req,res) =>{
    try{
    const Product = await Products.updateProducts(req.params.id, req.body);
    res.json({
        message : "Succesfully updated the product",
        code : 200,
        success : true,
        data : Product
    })
}catch(err){
    console.log("Something went wrong");
    console.log(err);
}
}

const getProductById = async(req,res) =>{
    try{
    const Product = await Products.getProductById(req.params.id);
    res.json({
        message : "Successfully fetched the product by the ID",
        code : 200,
        success : true,
        data : Product
    })
}catch(err){
    console.log("Something went wrong");
    console.log(err);
}
}

const getProductByCategoryId = async(req,res) => {
    try{
    const Product = await Products.getProductByCategoryId(req.query.id);
    res.json({
        message : "Successfully fetched the products for the category",
        code : 200,
        success : true,
        data : Product
    })
}catch(err){
    console.log("Something went wrong");
    console.log(err);
}
}

module.exports = {
    getProducts,
    createProducts,
    updateProducts,
    getProductById,
    getProductByCategoryId
}