const express = require('express');

const Router = require('express');

const { loggerDefault, loggerWarn, loggerError } = require('../helpers/loggerConf');

const { Product } = require('../models/product');



const serverConfigApiRouter = new Router()



serverConfigApiRouter.get('/config', async (req, res ) => {
    
    serverConfigs = {
        mongoUri: 'mongoUri = process.env.MONGO_URI',
        privateKey: 'privateKey = process.env.PRIVATE_KEY',
        accountSid: 'accountSid = process.env.ACCOUNT_SID',
        authToken: 'authToken = process.env.AUTH_TOKEN',
        number: 'number = process.env.NUMBER',
        whatsappNumber: 'whatsappNumber = process.env.WHATSAPP_NUMBER',
        emailAddress: 'email = process.env.EMAIL',
        emailPassword: 'mailPassword = process.env.MAILPASSWORD',
        host: 'host = process.env.HOST',
        
    };
    const userData = req.session.user_data;

    res.render('config', { serverConfigs, userData });
    // res.render('config', {serverConfigData:serverConfigData});
    // res.json(serverConfigData);

});

module.exports = { serverConfigApiRouter };
