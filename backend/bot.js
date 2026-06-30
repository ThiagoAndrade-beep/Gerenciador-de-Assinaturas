require('dotenv').config()
const TelegramBot = require('node-telegram-bot-api')
const telegramToken = process.env.TELEGRAM_AUTH_TOKEN

const bot = new TelegramBot(telegramToken, {
    polling: true //fica escutando as mensagens
})

console.log("Bot rodando...")
module.exports = bot
