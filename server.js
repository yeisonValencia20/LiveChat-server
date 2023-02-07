const express = require('express');
const cors = require('cors');
const { createServer } = require('http');
require('dotenv').config();

const { socketController } = require('./sockets/socketController');

const app = express();
const server = createServer( app );
const io = require('socket.io')( server, { 
    cors: {
      origin: 'http://localhost:5173'
    }
});

app.use( cors() );
app.use( express.json() );

// RUTAS
app.use('/', require('./routes/home'));

// SOCKET
io.on('connection', ( socket ) => { socketController( socket ) });

server.listen( process.env.PORT, ( error ) => {
    if(error) throw new Error(error);
    console.log( 'Escuchando en el puerto: ', process.env.PORT );
});