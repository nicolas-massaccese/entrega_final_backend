// const { getMensajes, saveMensaje } = require('../api/mensajes.js');

async function messageSocket(socket, sockets) {

    socket.on('loadMessages', async productos => {
        socket.emit('messages', productos);
    });

    socket.on('new-message', async message => {
        // const msgAdded = await saveMensaje(message);
        const msgAdded = message;
        sockets.emit('message-added', msgAdded);
    })
}

module.exports = { messageSocket };