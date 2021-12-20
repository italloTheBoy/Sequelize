const router = require('express').Router()
const Address = require('../../model/Address')


router.post('/' , async (req, res) => {
  const { userId, addressId } = req.body

  try {
    const address = await Address.findByPk(addressId, {
      attributes: ['userId']
    })

    if (!address || userId != address.userId) {
      req.flash('error', 'Endereço não encontrado')
      return res.status(404).redirect('/search/' + userId)
    }

    await Address.destroy({ where: { id: addressId } })

    res.status(200).redirect('/search/' + userId)
  }
  catch (err) {
    console.log(err)
    res.status(500).redirect('/500')
  }
})


module.exports = router