const cron = require('node-cron')
const User = require("./models/users.js")
const { sendExpirationAlert } = require('./telegramService.js')

function startCron() {
    cron.schedule("0 9 * * *", async () => {
        const users = await User.find()
        console.log("cron rodando...")
        console.log("Agora:", new Date())
        for (const user of users) {
            for (const signatures of user.signatures) {
                const hoje = new Date()
                hoje.setUTCHours(0, 0, 0, 0)

                const alertDate = new Date(signatures.dueDate)

                alertDate.setUTCDate(
                    alertDate.getUTCDate() - signatures.dayAlert
                )
                alertDate.setUTCHours(0, 0, 0, 0)

                console.log({
                    hoje: hoje.toISOString(),
                    dueDate: signatures.dueDate,
                    alertDate: alertDate.toISOString()
                })

                if (hoje.getTime() === alertDate.getTime()) {
                    sendExpirationAlert(
                        user.telegramChatId,
                        signatures.name,
                        signatures.dueDate.toLocaleDateString("pt-BR", { timeZone: "UTC" })
                    )
                } else {
                    console.log("Nenhuma assinatura está pra vencer!")
                }
            }
        }
    })
}

module.exports = {startCron}