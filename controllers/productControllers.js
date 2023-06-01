const { Product } = require("../models/product");
const { loggerDefault, loggerWarn } = require('../helpers/loggerConf');
const { productRead } = require("./read");

const getProducts = async (req, res) => {
    const userData = req.session.user_data;
    const products = await productRead();

    if (products) {
        res.render('profile', {products:products, userData});
    } else {
        loggerDefault.warn('Products not found');
        loggerWarn.warn('Products not found');
        res.json({msg: 'Products not found'});
    }
};

const getProductsByCategory = async (req, res) => {
    const { category } = req.params;
    const userData = req.session.user_data;

    let selectProduct = await Product.find({descripcion:category})

    if( selectProduct.length == 0 ){
        res.status(400).send({ error : 'producto no encontrado' });
        return;
    }    
    // res.json(selectProduct);
    res.render('profile', {products:selectProduct, userData});
};

module.exports = { getProducts, getProductsByCategory };