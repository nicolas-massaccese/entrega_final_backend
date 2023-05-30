const Router = require('express');
const { productRead, userRead } = require('../controllers/read');
const { loggerDefault, loggerWarn, loggerError } = require('../helpers/loggerConf');
const { isAuthenticated } = require('../helpers/tokensHandler');
const { Product } = require('../models/product');



const productsApiRouter = new Router()



productsApiRouter.get('/products', isAuthenticated, async (req, res ) => {
    
    const userData = req.session.user_data;
    const products = await productRead();
    
    res.render('profile', {products:products, userData});

});

productsApiRouter.get('/products/:category', isAuthenticated, async (req, res ) => {
    
    const { category } = req.params;
    const userData = req.session.user_data;

    let selectProduct = await Product.find({descripcion:category})

    if( selectProduct.length == 0 ){
        res.status(400).send({ error : 'producto no encontrado' });
        return;
    }    
    // res.json(selectProduct);
    res.render('profile', {products:selectProduct, userData});


});


module.exports = { productsApiRouter };
