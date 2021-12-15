const { Router } = require('express')
const router = Router()
const User = require('../../model/User')


router.post('/', async (req, res) => {
  await User.destroy({ where: { id: req.body.id } })
    .then(user => {
      if (!user) return res.status(404).redirect('/404')

      return res.status(200).redirect('/')
    })
    .catch(err => {
      res.status(500).redirect('/500')
      throw console.error(err)
    })
})


module.exports = router