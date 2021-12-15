const { Router } = require('express')
const router = Router()
const User = require('../../model/User')


router.post('/', async (req, res) => {
  await User.destroy({ where: { id: req.body.id } })

  res.status(200).redirect('/')
})


module.exports = router