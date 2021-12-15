const { Router } = require('express')
const router = Router()


const home = require('./home')
router.use(home)

const search = require('./search')
router.use('/search', search)

const notFound = require('./404')
router.use('/404', notFound)


module.exports = router