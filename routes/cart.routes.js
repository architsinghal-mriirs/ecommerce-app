const cartController = require('../controllers/cart.controller');

const routes = (app) => {
    app.post('/ecomm/api/v1/addProduct', cartController.addProductToCart);
    app.post('/ecomm/api/v1/removeProduct', cartController.removeProductFromCart);
    app.post('/ecomm/api/v1/updateCartStatus', cartController.updateCartStatus);
    app.get('/ecomm/api/v1/getCart', cartController.getUserCart);
    app.get('/ecomm/api/v1/getCartCost', cartController.getCartCost);
}

module.exports = routes;