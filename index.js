const express = require('express');
const cookieParser = require('cookie-parser');

const cors = require('cors');
const path = require('path');
const engine = require('ejs-mate');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const { config, a, b, c, d } = require('./config/enviroment.js');

// const { engine } = require('express-handlebars');

    // initializations
    const app = express();
    const httpServer = require('http').createServer(app);
    const io = require('socket.io') (httpServer, {cors: {origin:"*"}})

    const { connectToDb } = require('./config/database.js');
    require('./config/auth.js');
    // const { createProduct } = require('./controller/create.js');
    const { loggerError, loggerWarn, loggerDefault } = require('./helpers/loggerConf.js');


    app.set('views', path.join(__dirname, 'views'));
    app.engine('ejs', engine);
    app.set('view engine', 'ejs');
    app.set('port', process.env.PORT || 3000);


    // middlewares
    app.use(morgan('dev'));
    app.use(cors());
    app.use(express.json());
    app.use(express.static(__dirname + '/public'));
    app.use(cookieParser())
    app.use(express.urlencoded({extended: true}));

    app.use(session({
        secret: 'mysecretsession',
        resave: false,
        saveUninitialized: false
    }));
    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());

    app.use((req, res, next) => {
        res.locals.signupMessage = req.flash('signupMessage');
        res.locals.loginMessage = req.flash('loginMessage');
        res.locals.errorMsg = req.flash('errorMsg');
        res.locals.user = req.user;
        next();
    });


    // routes
    const { usersApiRouter } = require('./routes/usersApiRouter.js');
    const { productsApiRouter } = require('./routes/productsApiRouter.js');
    const { cartApiRouter } = require('./routes/cartApiRouter.js');
    const { chatApiRouter } = require('./routes/chatApiRouter.js');
    const { serverConfigApiRouter } = require('./routes/serverConfigApiRouter.js');
const { messageSocket } = require('./helpers/messageSocket.js');
    
    app.use(usersApiRouter);
    app.use(productsApiRouter);
    app.use(cartApiRouter);
    app.use(chatApiRouter);
    app.use(serverConfigApiRouter);
    
    app.get('*', (req, res) => {
        const {url, method} = req
        loggerWarn.warn(`Ruta ${method} ${url} inexistentes`);
        res.send(`Ruta ${method} ${url} inexistentes`);
    });


    // let chat = [
    //     {
    //         email:"a@agmail.com",
    //         date: new Date().toLocaleDateString(),
    //         message:"hola"
    //     }
    // ];

    io.on('connection', (socket) => {
        console.log(`New connection id: ${socket.id}`);

        messageSocket(socket, io.sockets);



    
    });

        
    // io.on('connection', (socket) => {
    //     console.log(`New connection id: ${socket.id}`);

    //     // messageSocket(socket, io.sockets);
        
    //     socket.emit('chat', chat);
    
    //     socket.on('newMessage', msg => {
    //         chat.push(msg);
    //         io.sockets.emit('chat', chat);
    //     });
    
    // });

    

    // starting server
    connectToDb()
        .then(() => httpServer.listen(config.p, () => loggerDefault.info(`Ready in port ${config.p} !`)))
        .catch((error) => loggerError.error(`Error en servidor ${error}`));