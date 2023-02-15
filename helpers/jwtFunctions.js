const jwt = require('jsonwebtoken');
const users = require('../models/users');

const createJWT = ( uid = '' ) => {
    return new Promise( (resolve, rejected) => {
        const payload = { uid };

        jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: '4h'
        }, ( err, token ) => {
            if (err) {
                console.log(err)
                rejected('Error gereting the token');
            }
            else {
                resolve(token);
            }
        })
    });
}

const verifyJWT = async( token = '' ) => {
    try {
        const { uid } = jwt.verify(token, process.env.SECRET_KEY);

        const user = await users.findById(uid);

        if (!user) {
            return null
        }
        return user
    }
    catch (error) {
        return null
    }
}

module.exports = {
    createJWT,
    verifyJWT
}