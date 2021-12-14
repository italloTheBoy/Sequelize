const { Router } = require('express')
const router = Router()


const home = require('./home')
router.use(home)

const reqister = require('./register')
router.use('/register', reqister)

const search = require('./search')
router.use('/search', search)

const destryoy = require('./destroy')
router.use('/destroy', destryoy)



module.exports = router