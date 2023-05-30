const nodemailer = require('nodemailer')
const { emailAddress, emailPassword, host } = require('../config/enviroment');


const sendNewMailOrder = async (productsInCart, user) => {

    const transporter = nodemailer.createTransport({
        host: host,
        port: 587,
        auth: {
            user: emailAddress,
            pass: emailPassword
        }
    });
    
    let info = await transporter.sendMail({
        from: `"Raul Lindgren" <${emailAddress}>`, // sender address
        to: emailAddress, // list of receivers
        subject: `Nuevo Pedido de ${user.firstname} ${user.email} ✔`, // Subject line
        text: `Productos comprados: ${productsInCart.name}
                Cantidad: ${productsInCart.amount}
        `, // plain text body
        html: `<p><b>Productos comprados:</b> ${productsInCart.name}</p>
                <p><b>Cantidad:</b> ${productsInCart.amount}</p>
        `, // html body
    });
    
    console.log(`done ${info}`);
    
}
module.exports= { sendNewMailOrder };