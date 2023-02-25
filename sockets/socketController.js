const { verifyJWT } = require("../helpers/jwtFunctions");

let userConnected = [];

const socketController = async( socket, io ) => {

    console.log(socket.id)
    const token = socket.handshake.headers['x-token'];
    const user = await verifyJWT(token);

    if (!user) {
        return socket.disconnect();
    }

    // users connected
    userConnected.push({...user._doc, id: user.id});
    socket.broadcast.emit('users-connected', userConnected.filter(uc => uc.id === user.id));
    socket.emit('users-connected', userConnected.filter(uc => uc.id !== user.id));

    // socket.on('connect', () => {
    //     // socket.broadcast.emit('users-connected', userConnected.filter(uc => uc.id !== user.id));
    //     console.log('se ha conectado un usuario')
    // });

    socket.on('disconnect', () => {
        userConnected = userConnected.filter( prev => prev.id !== user.id);
        io.emit('users-connected', userConnected);
    });

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