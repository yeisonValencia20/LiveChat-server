
const socketController = ( socket ) => {

    const token = socket.handshake.headers['x-token'];
    console.log(token)
    socket.on('message', ( payload, callback ) => {
        callback(payload)
    });
}


module.exports = {
    socketController
}