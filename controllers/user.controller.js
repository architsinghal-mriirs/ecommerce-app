const userService = require('../services/user.service');

const signUp = async(req,res) => {
    try{
    const response = await userService.signUp(req.body);
    return res.json({
        message : "Singup Successfull",
        code : 200,
        data : response
    });
}catch(err){
    console.log("Something went wrong");
    console.log(err);
}
}
const signIn = async(req,res) => {
    try{
    const user = await userService.getUser(req.body.email);
    if(!user){
        return res.json({
            code: 404,
            message: "Email id not found",
            success: false
        });
    }
    if(!userService.checkPassword(req.body.password, user.password)){
        return res.json({
            code: 401,
            message: "Password is incorrect",
            success: false
        })
    }
    const token = userService.createToken(user);
        return res.json({
            code: 200,
            message: "Sign in successfull",
            success: true,
            data: token
        });
    }catch(err){
        console.log("Something went wrong");
        console.log(err);
    }
}

const updateUser = async (req, res) => {
    try{
    let user;
    console.log(req.query);
    console.log(typeof req.query.addRole);
    console.log(req.query.addRole == true);
    if(req.query.addRole == 'true') {
    console.log("This is the true condition for addRole = true");
        user = userService.addRoleToUser(req.params.userId, req.body.roleId);
    } else {
        console.log("This is the false condition for addRole = false");
        user = userService.removeRoleFromUser(req.params.userId, req.body.roleId);
    }
    if(!user) {
        return res.json({
            success: false,
            code: 500,
            message: 'Internal server error, something went wrong'
        });
    }
    return res.json({
        success: true,
        code: 200,
        message: 'Updated the user'
    });
}catch(err){
    console.log("Something went wrong");
    console.log(err);
}
}

const getRolesForUser = async (req, res) => {
    try{
    console.log(req.params.userId);
    const response = await userService.getRolesForUser(req.params.userId);
    console.log(response);
    return res.json({
        success: true,
        code: 200,
        message: 'Successfully fetched the roles',
        data: response
    });
}catch(err){
    console.log("Something went wrong");
    console.log(err);
}
}
module.exports = {
    signUp,
    signIn,
    getRolesForUser,
    updateUser
}