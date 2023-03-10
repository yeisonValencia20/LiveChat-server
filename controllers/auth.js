const { response } = require("express");
const bcryptjs = require('bcrypt');

const { Users } = require("../models");
const { createJWT } = require("../helpers/jwtFunctions");

const login = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        // verify if user exist
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(400).json({
                msg: 'Users or password is not correct'
            });
        }

        // verify password
        const isValidPassword = bcryptjs.compareSync(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({
                msg: 'Users or password is not correct'
            });
        }

        // create Token
        const token = await createJWT(user.id);

        res.json({
            token
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Server Error'
        });
    }
}

const authToken = async( req, res = response ) => {
    try {
        return res.json({
            msg: 'Valid token'
        });
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    login,
    authToken
}