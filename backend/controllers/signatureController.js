const User = require("../models/users")

async function addSignature(req, res) {
    const { name, dueDate, dayAlert } = req.body
    const userId = req.user

    if (!name || !dueDate || dayAlert === null || dayAlert === undefined) {
        return res.status(422).json({ msg: "Por favor, Preencha todos os campos!" })
    }

    try {
        const user = await User.findById(userId)
        const today = new Date()
        const selectDate = new Date(dueDate)
        const characterLimitMax = 30
        const characterLimitMin = 2

        if (!user) {
            return res.status(404).json({ msg: "Usuário não encontrado!" })
        }

        today.setHours(0, 0, 0, 0)
        selectDate.setHours(0, 0, 0, 0)

        if (selectDate < today) {
            console.log('data inválida')
            return res.status(400).json({ msg: '* A data não pode ser menor que hoje' })
        }

        if (name.length > characterLimitMax) {
            console.log('Limite máximo de caracteres atingido')
            return res.status(400).json({ msg: '*O limite máximo é de 30 caracteres' })
        }

        if (name.length < characterLimitMin) {
            console.log('Não é possível adicionar uma assinatura com menos de 2 caracteres')
            return res.status(400).json({ msg: '* Não é possível adicionar uma assinatura com menos de 2 caracteres' })
        }

        const newAssignature = {
            name,
            dueDate: new Date(dueDate),
            dayAlert
        }
        user.signatures.push(newAssignature)
        await user.save()

        return res.status(201).json({ msg: "Assinatura adicionada com sucesso!", data: newAssignature })

    } catch (error) {
        console.log("erro", error)
        return res.status(500).json({ msg: "Erro no servidor interno" })
    }
}

async function viewSignature(req, res) {
    const userId = req.user
    try {
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ msg: "Usuário não encontrado!" })
        }
        return res.status(200).json({ msg: "Lista de assinaturas", data: user.signatures })
    } catch (error) {
        console.log("erro", error)
        return res.status(500).json({ msg: "erro no server" })
    }
}

async function deleteSignature(req, res) {
    const userId = req.user
    const { signatureId } = req.body

    try {
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ msg: "Usuário não encontrado!" })
        }

        const signature = user.signatures.id(signatureId)
        if (!signature) {
            return res.status(404).json({ msg: "Assinatura não encontrada!" })
        }
        signature.deleteOne()
        await user.save()

        res.status(200).json({msg: "Assinatura removida com sucesso!"})
    } catch (error) {
        console.log("erro ao deletar", error)
        return res.status(500).json({ msg: "Erro no servidor" }) 
    }
}

async function dashboard(req, res) {
    const userId = req.user
    try {
        const user = await User.findById(userId)
        if(!user) {
             return res.status(404).json({ msg: "Usuário não encontrado!" })
        }
        return res.status(200).json({msg: "dashboard do usuario:", user})
    } catch (error) {
        return res.status(401).json({ msg: "Usuário não autorizado!" })
    }
}

module.exports = {
    addSignature, 
    viewSignature, 
    deleteSignature,
    dashboard
}