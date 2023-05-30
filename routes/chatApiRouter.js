const express = require('express');

const Router = require('express');

const { loggerDefault, loggerWarn, loggerError } = require('../helpers/loggerConf');

const { Message } = require('../models/messages');



const chatApiRouter = new Router()



chatApiRouter.get('/chat', async (req, res ) => {
    

    const userData = req.session.user_data;
    // res.render('productslist', { root: __dirname + 'public'});

    res.render('chat', { userData });
});



chatApiRouter.get('/chat/:email', async (req, res ) => {
    

    const { email } = req.params;
    const userData = req.session.user_data;

    let selectChat = await Message.find({email:email})

    if( selectProduct.length == 0 ){
        res.status(400).send({ error : 'messages not fpund' });
        return;
    }    
    res.render('chat', { selectChat:selectChat, userData });
});




module.exports = { chatApiRouter };
