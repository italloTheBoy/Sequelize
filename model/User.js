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
  },
})


module.exports = User