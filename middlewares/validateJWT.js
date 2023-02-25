const { response } = require("express");
const jwt = require('jsonwebtoken');

const validateJWT = ( req, res = response, next ) => {
    
    const token = req.header('Authorization');
    if (!token) {
        return res.status(400).json({
            msg: 'No token'
        })
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRET_KEY);

        req.uid = uid;
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Server Error'
        });
    }

    next();
}

module.exports = {
    validateJWT
}