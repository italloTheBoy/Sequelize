const { Router } = require('express')
const router = Router()


const register = require('./register')
router.use('/register', register)


module.exports = router