const { response } = require("express");

const mensajeInicio = ( req, res = response ) => {
    console.log('bienvenido al servidor de LiveChat');
    return res.json({
        msg: 'bienvenido al servidor'
    })
}

module.exports = {
    mensajeInicio
}