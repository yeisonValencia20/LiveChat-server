const jwt = require('jsonwebtoken');

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
    //TODO:
}

module.exports = {
    createJWT,
    verifyJWT
}