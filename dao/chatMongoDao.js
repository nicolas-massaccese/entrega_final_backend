const { getDate } = require('../helpers/getDate')
const { Message } = require('../models/messages');


// const createMessage = async (msg) => {
//     const newMsg = new Message();
//     newMsg.email = msg.email;
//     newMsg.customRadio = msg.customRadio;
//     newMsg.date = obtenerFechaHora();
//     newMsg.message = msg.message;
//     await newMsg.save()
// };
const createMessage = async (msg) => {
    let now = obtenerFechaHora();
    const newMsg = { timestamp: now, ...msg };
    const sortedMessage = await Message.create(newMsg)
    return sortedMessage;
};

const readAllMessages = async () => {
    const sortedMessages = await Message.find({})
    return sortedMessages;
};



// async function saveMessage(message){
//     let now = getDate();
//     const newMsg = { timestamp: now, ...message };

//     const collectionProductos = databaseAtlas.collection("mensajes");

// }
function obtenerFechaHora() {
    const fecha = new Date();
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1;
    const anio = fecha.getFullYear();
    const horas = fecha.getHours();
    const minutos = fecha.getMinutes();
    const segundos = fecha.getSeconds();

    const fechaHora = `${dia}/${mes}/${anio} ${horas}:${minutos}:${segundos}`;

    return fechaHora;
};

const saveMessage = async (req, res) => {
    const messageToAdd = [
        {
            email: req.session.email,
            type: req.session.customRadio,
            date: obtenerFechaHora(),
            message: req.session.message,
        },
        
    ];

    const promises = messageToAdd.map(msg => {
        const newMsg= new Message(msg);

        return newMsg.save();
    });

    await Promise.all(promises);
};


module.exports = { createMessage, readAllMessages, saveMessage };