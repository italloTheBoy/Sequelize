const { Router } = require('express')
const router = Router()


const home = require('./home')
router.use(home)

const reqister = require('./register')
router.use('/register', reqister)


module.exports = router