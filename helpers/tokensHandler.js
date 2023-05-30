const jwt = require('jsonwebtoken');

const { privateKey } = require('../config/enviroment');

const generateToken = (user) => jwt.sign({user}, privateKey, {expiresIn: '1m'});

// const verifyToken = (token) =>  jwt.verify(token, privateKey);

function isAuthenticated(req, res, next) {
    const token = req.cookies.authorization;
    if(!token) {
        res.send('acces denied')
    }
    jwt.verify(token, privateKey, (err, user) => {
        if(err) {
            res.send('acces denied, token expired or incorrect')
        } else {
            next()
        }
    });
}
module.exports = { generateToken, isAuthenticated };

// function generateToken (user) {
//     return jwt.sign({user}, privateKey, {expiresIn: '5m'});
// };



// module.exports = { generateToken, verifyToken };