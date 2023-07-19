const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const Product = require('./product');
const User = require('./user');

const Rating = sequelize.define('rating', {
  rating: DataTypes.INTEGER,
  review: DataTypes.STRING,
});



Rating.belongsTo(User);
Rating.belongsTo(Product);


module.exports = Rating;
