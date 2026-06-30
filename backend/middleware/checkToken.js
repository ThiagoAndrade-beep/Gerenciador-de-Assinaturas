const jwt = require("jsonwebtoken")

function checkToken(req, res, next) {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]

    if(!token) {
         return res.status(401).json({ msg: "Você não está autorizado!" })
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET)
        req.user = decoded.id
        next()
    } catch (error) {
        return res.status(400).json({msg: "Token Inválido"})
    }
}

module.exports = checkToken