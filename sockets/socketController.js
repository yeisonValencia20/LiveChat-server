const { verifyJWT } = require("../helpers/jwtFunctions");

const socketController = async( socket ) => {

    const { token } = JSON.parse(socket.handshake.headers['x-token']);
    const user = await verifyJWT(token)

    if (!user) {
        return socket.disconnect();
    }

    socket.join(user.id);

    socket.on('message', ({ uid, message }) => {
        if (uid) {
            socket.to(uid).emit('private-message', { name: user.name, message });
        }
    });
}


module.exports = {
    socketController
}