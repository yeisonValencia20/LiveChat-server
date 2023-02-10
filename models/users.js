const { Schema, model } = require('mongoose');

const UsersSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is obligatory']
    },
    email: {
        type: String,
        required: [true, 'Email is obligatory']
    },
    password: {
        type: String,
        required: [true, 'Password is obligatory']
    },
    google: {
        type: Boolean,
        default: false
    },
});

UsersSchema.methods.toJSON = function() {
    const { __v, password, _id, ...user } = this.toObject();
    user.uid = _id;
    return user;
}

module.exports = model('Users', UsersSchema);