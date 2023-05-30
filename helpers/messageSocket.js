const { createMessage, saveMessage, readAllMessages } = require('../dao/chatMongoDao');



async function messageSocket(socket, sockets) {

    // socket.on('getMessages', async () => {
    //     const a =  await getMessage();
    //     console.log(a);
        
    //     // socket.emit('messages', a );
    // });

    // socket.on('new-message', async message => {
    //     const msgAdded = await saveMessage(message);
    //     sockets.emit('message-added', msgAdded);
    // })
    let chat = await readAllMessages()
    
    socket.emit('chat', chat);

    socket.on('newMessage', async msg => {
        const msgAdded = await createMessage(msg);
        sockets.emit('chat', msgAdded);
    });
    // socket.on('newMessage', msg => {
    //     chat.push(msg);
    //     sockets.emit('chat', chat);
    // });
}

module.exports = { messageSocket };