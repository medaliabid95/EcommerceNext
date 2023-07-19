const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const User = require('./user');

const Order = sequelize.define('order', {
  orderDate: DataTypes.DATE,
  totalAmount: DataTypes.DECIMAL(10, 2),
  shippingAddress: DataTypes.STRING,
  paymentStatus: DataTypes.STRING,
});

Order.belongsTo(User);


module.exports = Order;