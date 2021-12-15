const { Router } = require('express')
const router = Router()


const home = require('./home')
router.use(home)

const search = require('./search')
router.use('/search', search)

const serverError = require('./500')
router.use('/500', serverError)


const notFound = require('./404')
router.use('/404', notFound)


module.exports = router