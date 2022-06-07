const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware');

const signupRoutes = (app)=>{
    app.post('/ecomm/signup', userController.signUp);
    app.post('/ecomm/signin', userController.signIn);
    app.patch('/ecomm/api/v1/user/:userId', userController.updateUser);
    app.get('/ecomm/api/v1/user/:userId/getRoles', userController.getRolesForUser);
}

module.exports = signupRoutes;