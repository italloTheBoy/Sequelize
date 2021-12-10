const { DataTypes } = require('sequelize')
const db = require('./db')


const User = db.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  occupation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nawsletter: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    required: true,
    defaultValue: 0,
  },
})


module.exports = User