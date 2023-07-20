const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Message = sequelize.define('message', {
  content: DataTypes.STRING,
});

// Message.belongsTo("User", { as: 'sender', foreignKey: 'senderId' });
// Message.belongsTo("User", { as: 'recipient', foreignKey: 'recipientId' });

module.exports = Message;