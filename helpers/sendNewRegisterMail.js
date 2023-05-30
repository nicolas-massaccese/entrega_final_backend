const nodemailer = require('nodemailer')
const { emailAddress, emailPassword, host } = require('../config/enviroment');


const sendNewRegisterMail = async (newUser) => {

    const transporter = nodemailer.createTransport({
        host: host,
        port: 587,
        auth: {
            user: emailAddress,
            pass: emailPassword,
        }
    });
    
    let info = await transporter.sendMail({
        from: `"Raul Lindgren" <${emailAddress}>`, // sender address
        to: emailAddress, // list of receivers
        subject: "Nuevo Registro✔", // Subject line
        text: `Email: ${newUser.email}
Password: ${newUser.password}
Firstname: ${newUser.firstname}
Adress: ${newUser.adress}
Age: ${newUser.age}
Phone: ${newUser.phone}`, // plain text body
        html: `<p><b>Email:</b> ${newUser.email}</p> 
                <p><b>Password:</b> ${newUser.password}</p>
                <p><b>Firstname:</b> ${newUser.firstname}</p>
                <p><b>Adress:</b> ${newUser.adress}</p>
                <p><b>Age:</b> ${newUser.age}</p>
                <p><b>Phone:</b> ${newUser.phone}</p>`, // html body
        attachments: [
            {filename:'avatar.jpeg', path:'./public/uploads/avatar.jpeg'},
        ],
    });
    
    console.log(`done ${info}`);
    
}
module.exports= {sendNewRegisterMail}