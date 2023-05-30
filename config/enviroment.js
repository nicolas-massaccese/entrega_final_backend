const path = require ('path');
require('dotenv').config()
const process = require('process')
const yargs = require('yargs/yargs')(process.argv.slice(2));


const config = yargs.alias(
    {
        p: 'puerto',
        m: 'modo'
    }, 
)
.default({
    puerto: 3000,
    modo: 'FORK'
}).argv; 

module.exports = { config };
module.exports.mongoUri = process.env.MONGO_URI;
module.exports.privateKey = process.env.PRIVATE_KEY;
module.exports.accountSid = process.env.ACCOUNT_SID;
module.exports.authToken = process.env.AUTH_TOKEN;
module.exports.number = process.env.NUMBER;
module.exports.whatsappNumber = process.env.WHATSAPP_NUMBER;
module.exports.emailAddress = process.env.EMAIL_ADDRESS;
module.exports.emailPassword = process.env.MAILPASSWORD;
module.exports.host = process.env.HOST;

