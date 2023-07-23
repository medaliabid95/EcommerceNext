const User = require('../models/user.js');
const Messages = require("../models/messages.js")

const getMessages = async (req, res) => {
    try {
        const messages = await Messages.findAll()
        res.status(200).send(messages)
    } catch (error) {
        res.status(500).send(error)
    }
}

const sendMessage = async (req, res) => {
    try {
        const messages = await Messages.create({ content : req.body.content ,senderId: req.params.sender, recipientId: req.params.recipient})
        res.status(201).send(messages)
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports  = {sendMessage , getMessages}