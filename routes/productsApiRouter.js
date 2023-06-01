const Router = require('express');
const { isAuthenticated } = require('../helpers/tokensHandler');
const productControllers = require('../controllers/productControllers');

const productsApiRouter = new Router()

productsApiRouter.get('/products', isAuthenticated, productControllers.getProducts);

productsApiRouter.get('/products/:category', isAuthenticated, productControllers.getProductsByCategory);

module.exports = { productsApiRouter };
