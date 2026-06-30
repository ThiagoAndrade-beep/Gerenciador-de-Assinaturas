const bot = require('./bot')
const User = require("./models/users")

function telegramLister() {
    bot.onText(/\/start (.+)/, async (msg, match) => {
        console.log(msg)

        const telegramCode = match[1]
        const chatId = msg.chat.id

        const user = await User.findOne({
            telegramCode
        })

        if (!user) {
            return bot.sendMessage(
                chatId,
                'Código inválido'
            )
        }

        user.telegramChatId = chatId

        await user.save()

        bot.sendMessage(
            chatId,
            'Conta vinculada com sucesso! ✅'
        )
    })
}

module.exports = {telegramLister}