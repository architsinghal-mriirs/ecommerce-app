
const categoryController = require('../controllers/categoryController');

const routes = (app) => {
    app.get('/ecomm/api/v1/categories', categoryController.getCategory);
    app.post('/ecomm/api/v1/categories', categoryController.createCategory);
    app.delete('/ecomm/api/v1/categories/:id', categoryController.deleteCategory);
    app.get('/ecomm/api/v1/categories/:id', categoryController.getCategoryById);
    app.put('/ecomm/api/v1/categories/:id', categoryController.updateCategoryById);
}



module.exports = routes;