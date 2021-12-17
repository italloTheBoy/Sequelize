const { Router } = require('express')
const router = Router()
const User = require('../../model/User')
const Address = require('../../model/Address')


router.get('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const user = await User.findByPk(id, {
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      },
      raw: true,
    })

    const address = await Address.findOne({
      where: { userId: user.id },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'userId']
      },
      raw: true,
    })

    res.status(200).render('global/search', {user, address})

  }catch (err) {
    console.log(err)
    res.status(500).redirect('/500')
  } 
})


module.exports = router