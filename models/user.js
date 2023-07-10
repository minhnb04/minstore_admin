const mongoose = require('mongoose')
const Schema = mongoose.Schema

var User = new Schema({
    employeeCode: String,
    fullname: String,
    username: String,
    password: String,
    role: Number,
    phoneNumber: String,
    email: String,
    avatarImage: String,
    birthday: String,
    gender: Number,
    status: Boolean

})

module.exports = mongoose.model('User', User)
