const { Router } = require('express')
const router = Router()


const reqister = require('./register')
router.use('/register', reqister)

const destroy = require('./destroy')
router.use('/destroy', destroy)

const edit = require('./edit')
router.use('/edit', edit)


module.exports = router