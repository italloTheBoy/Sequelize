require('dotenv').config()
const db = require('./model/db')
const User = require('./model/User')
const path = require('path')
const express = require('express')
const hbs = require('express-handlebars')

// Config 
const app = express()

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded({
  extended: true
}))
app.use(express.json())

app.engine('handlebars', hbs.engine())
app.set('view engine', 'handlebars')

// Routes
const router = require('./router/router')
const { BIG5_BIN } = require('mysql/lib/protocol/constants/charsets')
app.use(router)

// Listen
db.sync()
  .then(() => {
    const port = process.env.PORT || 3000
    app.listen(port, () => console.log(`Running in http://localhost:${port}`))
  })
  .catch(err => console.error(err))