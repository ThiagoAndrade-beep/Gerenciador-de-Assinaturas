const User = require("../models/users")
const crypto = require("crypto")

async function connect(req, res) {
    const userId = req.user
    
    try {
        const user = await User.findById(userId)
        const code = crypto.randomBytes(4).toString("hex")

        await User.findByIdAndUpdate(user, {
            telegramCode: code
        })

        const telegramUrl = `https://t.me/Alerta_de_Assinaturas_bot?start=${code}`
        return res.status(200).json({telegramUrl, code})
    } catch (error) {
        return res.status(500).json({msg: "Erro ao conectar Telegram"})
    }
}

module.exports = {connect}