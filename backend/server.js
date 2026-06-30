const express = require("express")
const cors = require("cors")

const connectMongo = require("./db/connect")

const authRoutes = require("./routes/authRoutes")
const signatureRoutes = require("./routes/signatureRoutes")
const telegramRoutes = require("./routes/telegramRoutes")

const { startCron } = require("./signatureReminder.job")
const { telegramLister } = require("./telegramListener")

const app = express()

app.use(cors())
app.use(express.json())


app.use(authRoutes)
app.use(signatureRoutes)
app.use(telegramRoutes)

async function startServer() {

    await connectMongo()

    startCron()

    telegramLister()

    app.listen(3000, () => {
        console.log("Servidor rodando na porta 3000")
    })
}

startServer()