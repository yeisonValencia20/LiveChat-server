const { response } = require('express');
const bycrypt = require('bcrypt');

const { Users } = require('../models');

const singUp = async (req, res = response) => {

    const { name, email, password } = req.body;
    try {
        const existEmail = await Users.findOne({ email });
        if (existEmail) {
            return res.status(400).json({
                msg: 'Email already exist'
            });
        }

        const user = new Users({ name, email, password });

        // encrypt password 
        const salt = bycrypt.genSaltSync();
        user.password = bycrypt.hashSync( password, salt );

        // save in DB
        await user.save();

        res.json({
            user
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Server Error'
        });
    }
}

module.exports = {
    singUp
}