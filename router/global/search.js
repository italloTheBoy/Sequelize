const { Router } = require('express')
const router = Router()
const User = require('../../model/User')
const Address = require('../../model/Address')


router.get('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const user = await User.findByPk(id, {
      where: {id: id},

      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },

      include: {
        model: Address,
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'userId'],
        },
      },
    })

    if (!user) return res.status(404).redirect('/404')

    res.status(200).render('global/search', {
      user: user.get({ plain: true })
    })

  }catch (err) {
    console.log(err)
    res.status(500).redirect('/500')
  } 
})


module.exports = router