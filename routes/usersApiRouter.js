const Router = require('express');
const passport = require('passport');
const { upload } = require('../helpers/multer');
const userControllers = require('../controllers/userControllers');

const usersApiRouter = new Router();


usersApiRouter.get('/', userControllers.getUserDataIndex);

usersApiRouter.get('/signup', userControllers.getUserDataSignup);

usersApiRouter.post('/signup', upload.single('avatar'), passport.authenticate('local-signup', { successRedirect: '/login', failureRedirect: '/signup', passReqToCallback: true }));

usersApiRouter.get('/login', userControllers.getUserDataLogin);

usersApiRouter.post('/login', passport.authenticate('local-login', { failureRedirect: '/login', passReqToCallback: true }), userControllers.getToken);

usersApiRouter.get('/logout', userControllers.destroySession); 


module.exports = { usersApiRouter };
