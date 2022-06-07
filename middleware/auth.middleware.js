const authService = require('../services/user.service');

const isAuthenticated = async (req,res,next) => {
    let token = req.headers["x-access-token"];
    if(!token){
        return res.json({
            code: 401,
            message: 'No token provided'
        });
    }

    const response = authService.verifyToken(token);
    if(!response){
        return res.json({
            code: 401,
            message: 'Token not verified'
        })
    }

    try{

        const user = await authService.getUserById(response.id);
        req.user = user.id;
        console.log("User Authenticated M/W 2");
        next();

    }catch(err){
        return res.json({
            code: 401,
            message: 'User not found'
        });
    }
}

const isAuthorizedToPost = async (req,res,next) => {
    try{
    const userRole = await authService.getRolesForUser(req.params.userId);
    if(userRole.id == 1 || userRole.id == 2 ){
        console.log("User has the access to post");
        next();
    }else{
        res.json({
            message : "User not authorized to post"
        })
    }
}catch(err){
    console.log("Something went wrong");
    console.log(err);
}
}

module.exports = {
    isAuthenticated,
    isAuthorizedToPost
}