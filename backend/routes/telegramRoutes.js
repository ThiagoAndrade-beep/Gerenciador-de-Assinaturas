const express = require("express")
const router = express.Router()
const checkToken = require("../middleware/checkToken")

const {connect} = require("../controllers/telegramController")

router.post("/connect", checkToken, connect)

module.exports = router