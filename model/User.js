const { DataTypes } = require('sequelize')
const db = require('./db')


const User = db.define('user', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  occupation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  newsletter: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
    required: true,
  },
})


module.exports = User