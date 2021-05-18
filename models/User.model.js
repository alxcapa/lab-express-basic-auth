const mongoose = require('mongoose')

const authSchema = new mongoose.Schema({
    username: String,
    passwordH: String,
}, {
    timestamps: true
})

const authModel = mongoose.model('Auth', authSchema)

module.exports = authModel