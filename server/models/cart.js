const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const User = require('./user');

const Cart = sequelize.define('cart', {

    
});

Cart.belongsTo(User);

module.exports = Cart;