const { Router } = require('express')
const router = Router()


const home = require('./home')
router.use(home)

const reqister = require('./register')
router.use('/register', reqister)

const search = require('./search')
router.use('/search', search)

const destroy = require('./destroy')
router.use('/destroy', destroy)

const edit = require('./edit')
router.use('/edit', edit)


module.exports = router