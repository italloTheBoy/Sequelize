require('dotenv').config()
const session = require('express-session')
const flash = require('connect-flash')
const db = require('./model/db')
const Address = require('./model/Address')
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

app.use(session({
  secret: process.env.SECRET,
  saveUninitialized: true,
  resave: true,
}))

app.use(flash())

app.use((req, res, next) => {
  res.locals.success = req.flash('success')
  res.locals.error = req.flash('error')

  next()
})

// Routes
const router = require('./router/global/router')
app.use(router)

const userRouter = require('./router/User/router')
app.use('/User', userRouter)

// 404
app.use((req, res, next) => {
  res.status(404).redirect('/404')
})

// Listen
db.sync()
  .then(() => {
    const port = process.env.PORT || 3000
    app.listen(port, () => console.log(`\n Running in http://localhost:${port}`))
  })
  .catch(err => console.error(err))