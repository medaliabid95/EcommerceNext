const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const User = require('./user');

const Product = sequelize.define('product', {
  name: DataTypes.STRING,
  description: DataTypes.STRING,
  price: DataTypes.DECIMAL(10, 2),
  stock: DataTypes.INTEGER,
  imageUrl: DataTypes.STRING,
  is_approved: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, 
  }
});

Product.belongsTo(User);

module.exports = Product;
