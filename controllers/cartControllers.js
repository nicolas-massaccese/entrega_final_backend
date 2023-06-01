const { randomBytes } = require('crypto')
const { sendNewMailOrder }  = require('../helpers/sendNewMailOrder');
const { sendNewWhatsappOrder }  = require('../helpers/sendNewWhatsappOrder');

const User = require("../models/user");
const { Product } = require("../models/product");
const { Cart } = require("../models/cart");
const { loggerDefault, loggerWarn, loggerError } = require('../helpers/loggerConf');


const addProductsCart = async (req, res) => {
    const { name, img, price} = req.body;

    // Nos fijamos si el producto existe
    const productsExist = await Product.findOne({ name });

    // Nos fijamos si todos los campos vienen con info
    const itsNotEmpty    = name !== '' && img !== '' && price !== '';

    // Nos fijamos si el producto existe en el carrito
    const productsInACart = await Cart.findOne({ name });

    // Si no tenemos el producto
    if (!productsExist) {
        loggerDefault.warn('This product is not found in the database');
        loggerWarn.warn('This product is not found in the database');
        res.status(400).json({
            msg:'This product is not found in the database'
        })

    // Si nos envian algo y no esta en el carrito lo agregamos
    } else if (itsNotEmpty && !productsInACart) {
        const newProductsInACart = new Cart({ name, img, price, amount: 1 });

    // Actualizamos la propiedad InCart
    await Product.findByIdAndUpdate(
        productsInACart?._id,
        { inCart: true, name, img, price },
        { new: true }
    )
        .then((product) => {
            newProductsInACart.save();
            loggerDefault.info('The product was added to the cart');
            res.json({
                msg:'The product was added to the cart',
                product,
            }); 
        })
        
        .catch((error) => {
            loggerDefault.error('Ups! The product was not added to the cart');
            loggerError.error('Ups! The product was not added to the cart');
            console.error('Ups! The product was not added to the cart', error)
            })
    } else if (productsInACart) {
        loggerDefault.info('The product is already in the cart');
        res.status(400).json({
            msg:'The product is already in the cart'
        });
    }
};

const getProductsCart = async (req, res) => {
    const productsCart = await Cart.find();

    if (productsCart) {
        res.json({ productsCart });
    } else {
        loggerDefault.warn('There are no products in the cart' );
        loggerWarn.warn('There are no products in the cart' );
        res.json({ msg: 'There are no products in the cart' });
    }
};

const putProductInCart = async (req, res) => {
    const { productId } = req.params;
    const { query } = req.query;
    const { body } = req.body;

    // Buscamos el producto en el carrito
    const searchProduct = await Cart.findById({ productId });

    // Si no hay query 'add' o 'del'
    if (!query) {
        loggerDefault.warn('You must send a query');
        loggerWarn.warn('You must send a query');
        res.status(400).json({ msg: 'You must send a query' });

    // Si esta el producto y quiero agregar
    } else if (searchProduct && query === 'add') {
        body.amount = body.amount + 1;

    await Cart.findByIdAndUpdate(productId, body, {
        new: true,
    }).then((product) => {
        loggerDefault.info( `The product ${product.name} was updated`);
        res.json({
            msg: `The product ${product.name} was updated`,
            product,
        }); 
    });
    // Si esta el producto y quiero eliminar
    } else if (searchProduct && query === 'del') {
        body.amount = body.amount - 1;

        await Cart.findByIdAndUpdate(productId, body, {
            new: true,
        }).then((product) => {
            loggerDefault.info( `The product ${product.name} was removed`);
            res.json({
                msg: `The product ${product.name} was removed`,
                product,
            }); 
        });
    } else {
        loggerDefault.warn('Ups! an error occurred');
        loggerWarn.warn('Ups! an error occurred');
        res.status(400).json({ msg: 'Ups! an error occurred' });
    }
};


const handleResponse = (result, res) => {
    if (result.result === 'success') {
        loggerDefault.info(`Order sent!!! Message Id is ${result.messageId}`);
        res.send(`Order sent!!! Message Id is ${result.messageId}`);
    } else {
        loggerDefault.warn(`Failed to send order, reasons: ${result.message}`);
        loggerWarn.warn(`Failed to send order, reasons: ${result.message}`);
        res.status(500).send(`Failed to send order, reasons: ${result.message}`)
    }
};

const sendCartOrder = async (req, res) => {
    const userData = req.session.user_data;

    const email = userData.email
    console.log(email);
    const user = await User.findOne({email:email});

    
    const productsInCart = await Cart.find();
 
    const number = user.phone;
    console.log(number);
    console.log(user.firstname);


    // if (!productsInCart) {
    //     res.status(500).send('there are no products in the cart');

    //     // helpers.sendNewMailOrder();
    //     // helpers.sendNewWhatsappOrder();
    //     return;
    // }
    sendNewMailOrder(productsInCart, user);
    const result =  await sendNewWhatsappOrder(number, randomBytes(8).toString('hex'),true);
    handleResponse(result, res);
};

const deleteCartProduct = async (req, res) => {
    const { productId } = req.params;

    // Buscamos el producto en el carrito
    const productInACart = await Cart.findById({ productId });
    
    // Buscamos el producto en nuestra DB por el nombre dl que esta en el carrito
    const { name, img, price, _id } = await Product.findOne({ name: productInACart.name });
    
    // Buscamos y eliminamos l producto por _id
    await Cart.findByIdAndDelete({ productId });

    await Product.findByIdAndUpdate(
        _id,
        { inCart: false, name, img, price },
        { new: true }
    )
        .then((product) => {
            loggerDefault.info(`The product ${product.name} was removed`);
            res.json({
                msg:`The product ${product.name} was removed`,
            }); 
        })
        .catch((error) => {
            loggerDefault.error('Ups! The product was removed' );
            loggerError.error('Ups! The product was removed' );
            console.error('Ups! The product was removed', error);
        })
};
module.exports = { getProductsCart, addProductsCart, putProductInCart, sendCartOrder,  deleteCartProduct};