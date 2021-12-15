const { DataTypes } = require('sequelize')
const db = require('./db')
const User = require('./User')


const Address = db.define('address', {
  street: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true
  },
  district: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true,
  },
  number: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true,
  }
}).belongsTo(User)


module.exports = Address