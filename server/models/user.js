
const {DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const Message = require("./messages")
const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('admin', 'seller', 'client'),
    defaultValue: 'client'
  },
  imgUrl: {
    type: DataTypes.STRING,
    allowNull: false
  },
  coverUrl: {
    type: DataTypes.STRING,
  },
  bio: DataTypes.STRING
});


User.hasMany(Message, { as: 'sentMessages', foreignKey: 'senderId' });
User.hasMany(Message, { as: 'receivedMessages', foreignKey: 'recipientId' });

module.exports = User;  