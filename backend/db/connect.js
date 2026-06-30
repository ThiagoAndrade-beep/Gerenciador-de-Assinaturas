const mongoose = require("mongoose")
require("dotenv").config()

const mongoUri = process.env.MONGO_URI

async function connect() {
    try {
        await mongoose.connect(mongoUri)
        console.log("banco conectado!")
    } catch (error) {
        console.log("erro ao conectar no mongo", error)
    }
}

module.exports = connect