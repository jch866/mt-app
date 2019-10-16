const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
const properties = {
    username: {
        require: true,
        unique: true,
        type: String
    },
    password: {
        require: true,
        type: String
    },
    email: {
        require: true,
        type: String
    }
}
const userSchema = new mongoose.Schema(properties);

module.exports = mongoose.model('User', userSchema)