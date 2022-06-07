const Auth = require('../services/user.service');   
const Role = require('../models/index').roles;


const isAdmin = async (req) => {
    try{
    const user = await Auth.getUserById(req.user);
    const adminRole = await Role.findOne({
        where:{
            id : 3
        }
    })
    //returns true if the user has adminRole
    return await user.hasRole(adminRole);
}catch(err){
    console.log("Something went wrong");
    console.log(err);
}
}

const isSeller = async(req) => {
    try{
    const user = await Auth.getUserById(req.user);
    const sellerRole = await Role.findOne({
        where:{
            id : 1
        }
    })
    // returns true if the user has sellerRole
    return await user.hasRole(sellerRole);
}catch(err){
    console.log("Something went wrong");
    console.log(err);
}
}

const canAddProducts = async (req,res,next) => {
    try{
    const Admin = await isAdmin(req);
    const Seller = await isSeller(req);

    if(Admin || Seller){
        console.log("User Authorized M/W 3");
        next();
    }else{
        res.json({
            message : 'User has no permission to add products',
            success : false,
            code : 401
        })
    }
}catch(err){
    console.log("Something went wrong");
    console.log(err);
}
}

module.exports = {
    canAddProducts
}