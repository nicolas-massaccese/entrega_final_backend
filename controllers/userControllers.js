const {  readOneUser } = require('../dao/userMongoDao');
const { generateToken } = require('../helpers/tokensHandler');


const getToken = async (req, res) => {
    req.session.user_data = req.body;

    const {email, password} = req.session.user_data;

    const user = await readOneUser({email:email})
    console.log({user});
    if (!user) {
        res.json({ error: 'credenciales invalidas'})
    }
    const token = generateToken(user);

    res.cookie('authorization', token).redirect('/products');
};



const getUserDataIndex = async (req, res) => {
    const userData = req.session.user_data;
    res.render('index',{userData})
};

const getUserDataSignup = async (req, res) => {
    const userData = req.session.user_data;
    res.render('signup',{userData})
};

const getUserDataLogin = async (req, res) => {
    const userData = req.session.user_data;
    res.render('login',{userData});
};

const destroySession = async (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    })
};

module.exports = { getUserDataIndex, getUserDataSignup, getUserDataLogin, getToken, destroySession};