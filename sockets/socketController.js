
const socketController = ( socket ) => {
    console.log('Nuevo usuario conectado');

    //socket.emit('connection', null);

    socket.on('message', ( payload, callback ) => {
        callback(payload)
    });
}


module.exports = {
    socketController
}