const { verifyToken } = require('./tokensHandler');
const { logger } = require('./loggerConf');

const isAuthenticated = (req, res, next) => {

    const token = req.cookies.authorization;

    console.log({token});
    if(!token){
        console.log(token);
        res.json({error: 'No credentials!'})
    }
        
    const decodedData = verifyToken(token);
    req.user = decodedData;
    next();
        
    };

module.exports = isAuthenticated ;