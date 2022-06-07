const productController = require('../controllers/productController');
const productMiddleWare = require('../middleware/product.middleware');
const authMiddleware = require('../middleware/auth.middleware');
const authorizationMiddleware = require('../middleware/authorization.middleware');

const productRoutes = (app)=>{
    //app.get('/ecomm/api/v1/products', productController.getProducts);
    app.get('/ecomm/api/v1/products', authMiddleware.isAuthenticated, productController.getProducts);
    
    app.post('/ecomm/api/v1/products',

    productMiddleWare.validateProductCreationRequest,
    authMiddleware.isAuthenticated,
    authorizationMiddleware.canAddProducts,
    productController.createProducts);


    app.put('/ecomm/api/v1/products/:id', productController.updateProducts);
    app.get('/ecomm/api/v1/products/:id' ,productController.getProductById);
}

module.exports = productRoutes;

//FiraCode
