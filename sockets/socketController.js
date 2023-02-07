
const socketController = ( socket ) => {
    console.log('Nuevo usuario conectado');

    //socket.emit('connection', null);

    socket.on('saludo', ( payload, callback ) => {
        callback(payload)
    })
}


module.exports = {
    socketController
}