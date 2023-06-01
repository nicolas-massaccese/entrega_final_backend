const { createMessage, saveMessage, readAllMessages } = require('../dao/chatMongoDao');

async function messageSocket(socket, sockets) {
    
    socket.on('get-chat', async () => {
        let chat = await readAllMessages();
        console.log(chat);
        socket.emit('chat', chat);
    });

    socket.on('newMessage', async msg => {
        const msgAdded = await createMessage(msg);
        console.log(msgAdded);
        sockets.emit('message-added', msgAdded);
    });
};

module.exports = { messageSocket };