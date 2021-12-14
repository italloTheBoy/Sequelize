const { Router } = require('express')
const router = Router()
const User = require('../model/User')


router.get('/:id', async (req, res) => {
  const { id } = req.params

  const user = await User.findByPk(id, {raw: true})
    .catch(err => console.error(err))

  res.status(200).render('search', {user})
})


module.exports = router