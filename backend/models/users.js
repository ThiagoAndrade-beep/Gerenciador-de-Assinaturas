const mongoose = require("mongoose")
const { type } = require("os")

const signatureSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    dayAlert: {
        type: Number,
        required: true
    }
})

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    telegramChatId: {
        type: String,
        default: null
    },
    telegramCode: {
        type: String,
        default: null
    },
    signatures: [signatureSchema]
})

const User = mongoose.model("User", userSchema)

module.exports = User