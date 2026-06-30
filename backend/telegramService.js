const bot = require('./bot')

async function sendExpirationAlert(chatId, signatureName, dueDate) {
    await bot.sendMessage(
        chatId,
        `⚠️ A assinatura ${signatureName} vence em breve.\nData de vencimento: ${dueDate}`
    )
}

module.exports = {sendExpirationAlert}