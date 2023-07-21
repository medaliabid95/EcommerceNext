const express = require("express")
const router = express.Router()
const {getMessages,sendMessage}=require("../controllers/messagesController.js")

router.get("/all/:sender/:recipient",getMessages)
router.post("/post/:sender/:recipient",sendMessage)
module.exports = router