const { Router } = require('express')
const router = Router()
const User = require('../model/User')


router.get('/', async (req, res) => {
  const user = await User.findAll({ attributes: ['name', 'id'], raw: true })
  res.status(500).render('home', { user })
})


module.exports = router