

const middlewareGetProdByID = (req,res,next)=>{
    
    if(!req.body.name){
        res.json({
            success : false,
            code : 400,
            message : "Name is not present"
        })
    }
    if(!req.body.description){
        res.json({
            success : false,
            code : 400,
            message : "Description not present"
        })
    }
    next();
}

const updateProductMiddleware = (req,res,next)=>{

    req.params.id = parseInt(req.params.id);
    if(isNaN(req.params.id) || req.params.id <= 0){
        res.json({
            success : false,
            code: 400,
            message : "Id must be a number greater than 0"
        })
    }
   
    next();
}

const updateProductCheckTwo = (req,res,next)=>{
    try{
     if(!req.body.name || !req.body.description || !req.body.cost || !req.body.categoryId){
        res.json({
            success : false,
            code: 400,
            message : "Request body must have all the data"
        })
    }
    next();
}catch(err){
    console.log("Something went wrong");
    console.log(err);
}
}

const validateProductCreationRequest = (req,res,next) => {
    try{
    if(!req.body.name || !req.body.cost || !req.body.categoryId){
        return res.json({
            code : 400,
            success: false,
            message: 'Arguments missing for creating product'
        })
    }
    console.log("Request Validated M/W 1");
    next();
}catch(err){
    console.log("Something went wrong");
    console.log(err);
}
}


module.exports = {
    middlewareGetProdByID,
    updateProductMiddleware,
    updateProductCheckTwo,
    validateProductCreationRequest
}