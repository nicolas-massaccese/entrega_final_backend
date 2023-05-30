const express = require('express');
const bcrypt = require('bcrypt');
const Router = require('express');
const passport = require('passport');
const {  readOneUser } = require('../dao/userMongoDao');
// const isAuthenticated = require('../helpers/isAuthenticated')
const { loggerDefault, loggerWarn, loggerError } = require('../helpers/loggerConf');
const { upload } = require('../helpers/multer');
const { generateToken, isAuthenticated } = require('../helpers/tokensHandler');
const User = require('../models/user');



const usersApiRouter = new Router()


usersApiRouter.get('/', (req, res, next) => {
    const userData = req.session.user_data;

    res.render('index',{userData})
});


usersApiRouter.get('/signup', (req, res, next) => {
    const userData = req.session.user_data;

    res.render('signup',{userData})

});


usersApiRouter.post('/signup', upload.single('avatar'), passport.authenticate('local-signup', {
    failureRedirect: '/signup',
    passReqToCallback: true
}),
function(req, res, next){
        // req.flash('userData', req.body) 
    res.redirect('/login');

});

usersApiRouter.get('/login', (req, res, next) => {
    const userData = req.session.user_data;
    res.render('login',{userData});

});



usersApiRouter.post('/login', passport.authenticate('local-login', {
        failureRedirect: '/login',
        passReqToCallback: true,
    }),
async (req, res, next) => {
    req.session.user_data = req.body;

    const {email, password} = req.session.user_data;

    const user = await readOneUser({email:email})
    console.log({user});
    if (!user) {
        res.json({ error: 'credenciales invalidas'})
    }
    const token = generateToken(user);

    res.cookie('authorization', token).redirect('/products');;

});


usersApiRouter.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    })
}); 


module.exports = { usersApiRouter };
