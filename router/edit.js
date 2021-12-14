const { Router } = require('express')
const router = Router()
const User = require('../model/User')


router.get('/:id', async (req, res) => {
  const check = true
  const id = req.params.id

  const user = await User.findByPk(id, {raw: true})

  if (user.newsletter != 1) {
    const check = null
  }
  console.log(check)

  res.render('edit', { user, check })
})


module.exports = router