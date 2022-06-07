const Category = require('../models/index').Categories;
const Products = require('../models/index').Products;
const { Op } = require("sequelize");

const createFilter = (data) =>{
    //filter is an object
    let filter = {};
    //both min/max are present
    if(data.minPrice && data.maxPrice){
        Object.assign(filter, {[Op.lte] : data.maxPrice});
        Object.assign(filter, {[Op.gte] : data.minPrice});
    }else if(data.maxPrice){ // only max price is present
        Object.assign(filter, {[Op.lte] : data.maxPrice});
    }else if(data.minPrice){ // only min price is present
        Object.assign(filter, {[Op.gte] : data.minPrice});

    }
    return filter;
}
const getProducts = async(data) => {
    let products;
    //if no query params present then find all the products from product table.
    if(!data.categoryId && !data.maxPrice && !data.minPrice){
    const products = await Products.findAll({include : Category});
    return products;
    }
    //if category id is not present in the query params but either min/max or both min/max are present.
    if(!data.categoryId){
        let filter = createFilter(data);
        products = await Products.findAll({where:{
            cost : filter //here filter is an object. cost expects an object and we can use { Op } from sequelize to query on the cost.
        }});
        return products;
    }
    //if all query params are present
    let filter = createFilter(data);
    products = await Products.findAll({where:{
        cost : filter,
        categoryId : data.categoryId
    }});
    return products;
}

const createProducts = async(data) => {
    try{
    const products = await Products.create({
        name : data.name,
        description : data.description,
        cost : data.cost,
        categoryId : data.categoryId,
        createdAt : new Date(),
        updatedAt : new Date()
    });
    return products;
}catch(err){
    console.log("Something went wrong");
    console.log(err);
}}

const updateProducts = async(productId, data) =>{
    try{
    const products = await Products.update(
        {
            name : data.name,
            description : data.description,
            cost: data.cost,
            categoryId : data.categoryId
        },
        {
            where :{
                id : productId
            }
        }
    )

    return products;
}catch(err){
    console.log("Something went wrong");
    console.log(err);
}}

const getProductById = async(productId) =>{
    try{
    const products = await Products.findOne({
        where:{
            id: productId
        }
    })
    return products;
}catch(err){
    console.log("Something went wrong");
    console.log(err);
}
}

const getProductByCategoryId = async(categoryIdPassed) => {
    const products = await Products.findAll({
        where : {
            categoryId : categoryIdPassed
        }
    })
}

module.exports = {
    getProducts,
    createProducts,
    updateProducts,
    getProductById,
}