const Router = require('express');
const cartControllers  = require('../controllers/cartControllers');

const cartApiRouter = new Router()

cartApiRouter.get('/products-cart', cartControllers.getProductsCart);

cartApiRouter.get('/products-cart/sendCartOrder', cartControllers.sendCartOrder);

cartApiRouter.post('/products-cart', cartControllers.addProductsCart);

cartApiRouter.put('/products-cart/:productId', cartControllers.putProductInCart);

cartApiRouter.delete('/products-cart/:productId', cartControllers.deleteCartProduct);

module.exports = { cartApiRouter };
