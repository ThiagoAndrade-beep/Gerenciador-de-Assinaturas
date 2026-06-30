const express = require("express")
const router = express.Router()
const checkToken = require("../middleware/checkToken")

const {
    addSignature, 
    viewSignature, 
    deleteSignature,
    dashboard
} = require("../controllers/signatureController")

router.post("/add-signature", checkToken, addSignature)
router.get("/view-signature", checkToken, viewSignature)
router.delete("/delete-signature", checkToken, deleteSignature)
router.get("/dashboard", checkToken, dashboard)

module.exports = router