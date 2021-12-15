const { Router } = require('express')
const router = Router()


router.get('/', (req, res) => {
  res.render('global/500')
})


module.exports = router