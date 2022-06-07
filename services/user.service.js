const userTable = require('../models/index').Users;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const roleTable = require('../models/index').roles;

const signUp = async(data) => {
    try{
    const user = await userTable.create({
        email : data.email,
        password : data.password
    });
    return user;
    }catch(err){
    console.log("Something went wrong");
    console.log(err);
}
}

const getUser = async(userEmail) => {
    try{
    const user = await userTable.findOne({
        where:{
            email : userEmail
        }
    });
    return user;
    }catch(err){
    console.log("Something went wrong");
    console.log(err);
}
}

const getUserById = async(userId) => {
    try{
    const user = await userTable.findOne({
        where:{
            id : userId
        }
    });
    return user 
    }catch(err){
    console.log("Something went wrong");
    console.log(err);
}
}
//passwords are being compared. returns true if the password
const checkPassword = (userPassword, hashedPassword) => {
    try{
    return bcrypt.compareSync(userPassword, hashedPassword);
}catch(err){
    console.log("Something went wrong");
    console.log(err);
}
}
// creates a token using jwt package with the user credentials
const createToken = (user) => {
    try{
    return jwt.sign({id: user.id, email: user.email}, 'relevel', {expiresIn: 60 * 60});
}catch(err){
    console.log("Something went wrong");
    console.log(err);
}
}
//verifying the user token. if the token is verified then the user will be granted access.
const verifyToken = (token) => {
    try{

        const response = jwt.verify(token, 'relevel');
        return response;

    }catch(err){
        console.log("Token not verified");
        console.log(err);
    }
}

const addRoleToUser = async(userId, roleId) => {
    try{
        console.log("Reached here");
        const user = await userTable.findOne({
            where:{
                id : userId
            }
        });
     
        const role = await roleTable.findOne({
            where:{
                id : roleId
            }
        });
     
        user.addRole(role);
        return user;
    }catch(err){
        console.log("Something went wrong");
        console.log(err);
    }
   

}


const removeRoleFromUser = async(userId, roleId) => {
    try{
        const user = await userTable.findOne({
            where:{
                id : userId
            }
        });
     
        const role = await roleTable.findOne({
            where:{
                id : roleId
            }
        });
     
        user.removeRole(role);
        return user;
    }catch(err){
        console.log("Something went wrong");
        console.log(err);
    }
}

const getRolesForUser = async (userId) => {
    try{
        const user = await userTable.findOne({
            where:{
                id : userId
            }
        });

        const roles = await user.getRoles();
        return roles;
    }catch(err){
        console.log(err);
    }
}



module.exports = {
    signUp,
    getUser,
    checkPassword,
    createToken,
    verifyToken,
    getUserById,
    getRolesForUser,
    addRoleToUser,
    removeRoleFromUser
}