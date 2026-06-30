const bcrypt = require("bcrypt")
const User = require("../models/users")
const jwt = require("jsonwebtoken")

async function registerUser(req, res) {
    const { email, password } = req.body

    if (!email) {
        return res.status(422).json({ msg: "Preencha o input com seu email!" })
    }

    if (!password) {
        return res.status(422).json({ msg: "Preencha o input com sua senha!" })
    }

    const passwordRegex = /^(?=.*[@$!%*?&#])/;
    const result = passwordRegex.test(password)

    if (password.length < 6) {
        return res.status(422).json({ msg: "A senha deve conter no mínimo 6 caracteres!" })
    }

    if (!result) {
        return res.status(422).json({ msg: "A senha deve conter pelo menos um caractere especial!" })
    }

    const userExist = await User.findOne({ email: email })
    if (userExist) {
        return res.status(422).json({ msg: "Nosso sistema já possui um cadastro com esse email! " })
    }

    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    const user = new User({
        email,
        password: passwordHash
    })

    try {
        await user.save()
        res.status(200).json({ msg: "Usuário cadastrado com sucesso!" })
    } catch (error) {
        console.log("erro ao cadastrar usuario", error)
    }
}

async function loginUser(req, res) {
    const { email, password } = req.body

    if (!email) {
        return res.status(422).json({ msg: "Preencha o input com seu email!" })
    }

    if (!password) {
        return res.status(422).json({ msg: "Preencha o input com sua senha!" })
    }

    const userEmail = await User.findOne({email: email})
    if(!userEmail) {
         return res.status(404).json({ msg: "Nenhum usuário com esse email foi encontrado" })
    }

    const userPassword = await bcrypt.compare(password, userEmail.password) 
    if(!userPassword) {
        return res.status(422).json({ msg: "Senha incorreta" })
    }

    try {
        const token = jwt.sign(
            {
                id: userEmail._id
            },
            process.env.SECRET,
        )
        res.status(200).json({msg: "Usuário logado com sucesso!", token, userId: userEmail._id})
        console.log("Token enviado para o front end:", token)
    } catch (error) {
         console.log("Algo de errado aconteceu ao tentar fazer o login:", error)
    }
}

module.exports = {registerUser, loginUser}