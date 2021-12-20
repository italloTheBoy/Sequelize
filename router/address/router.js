const { Router } = require('express')
const router = Router()


const register = require('./register')
router.use('/register', register)

const destroy = require('./destroy')
router.use('/destroy', destroy)

const edit = require('./edit')
router.use('/edit', edit)


module.exports = router