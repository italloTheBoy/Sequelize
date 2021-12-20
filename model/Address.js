const { DataTypes } = require('sequelize')
const db = require('./db')
const User = require('./User')


const Address = db.define('address', {
  city: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true,
  },
  district: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true,
  },
  street: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true,
  },
  number: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true,
  },
})
User.hasOne(Address)
Address.belongsTo(User)


module.exports = Address