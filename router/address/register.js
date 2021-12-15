const {Router} = require('express')
const router = Router()
const Address = require('../../model/Address')
const User = require('../../model/User')


router.get('/:id', async (req, res) => {
  const pk = Number(req.params.id)

  const id = await User.findByPk(pk, {
    attributes: ['id'],
    raw: true
  })
  .catch(err => {
    res.status(500).redirect('/500')
    throw console.error(err)
  })

  if (!id) {
    return res.status(404).redirect('/404')
  }

  res.status(200).render('address/register', { userId: id.id })
})

router.post('/', async (req, res) => {
  const { userId, city, district, street, number } = req.body
  const err = {}

  // Val userId
  if (!userId) err.userId = 'Insira um Id'
  else if (userId != Number(userId)) err.userId = 'O Id deve ser um número'
  else if (userId <= 0) err.userId = 'O Id deve ser maior que 0'
  else {
    await User.findByPk(userId, {attributes: ['id']})
    .then( user => {
      if (!user) err.userId = 'Id não encontrado'
    })
    .catch(err => {
      console.error(err)
      res.status(500).redirect('/500')
    })
  }

  // Val City
  if (!city || city.trim() === '') err.city = 'Insira uma cidade'
  else if (typeof city != 'string') err.city = 'A cidade deve ser uma string'
  else if (city.length < 3) err.city = 'A cidade deve ter no mínimo 3 caracteres'
  else if (city.length > 50) err.city = 'A cidade deve ter no máximo 50 caracteres'
  
  // Val District
  if (!district || city.trim() === '') err.district = 'Insira um bairro'
  else if (typeof district != 'string') err.district = 'O bairro deve ser uma string'
  else if (district.length < 3) err.district = 'O bairro deve ter no mínimo 3 caracteres'
  else if (district.length > 50) err.district = 'O bairro deve ter no máximo 50 caracteres'
  
  // Val Street
  if (!street || street.trim() === '') err.street = 'Insira uma rua'
  else if (typeof street != 'string') err.street = 'A rua deve ser uma string'
  else if (street.length < 3) err.street = 'A rua deve ter no mínimo 3 caracteres'
  else if (street.length > 50) err.street = 'A rua deve ter no máximo 50 caracteres'
  
  // Val Number
  if (!number || number.trim() === '') err.number = 'Insira um número'
  else if (typeof number != 'string') err.number = 'O número deve ser uma string'
  else if (number.length < 3) err.number = 'O número deve ter no mínimo 3 caracteres'
  else if (number.length > 50) err.number = 'O número deve ter no máximo 50 caracteres'

  
  //Redirect
  if (Object.keys(err).length > 0) {
    res.status(400).render('address/register', {
      userId,
      city: city.trim(),
      district: district.trim(),
      street: street.trim(),
      number: number.trim(),
      err
    })
  } else {
    await Address.create({
      userId,
      city: city.trim().toLowerCase(),
      district: district.trim().toLowerCase(),
      street: street.trim().toLowerCase(),
      number: number.trim().toLowerCase(),
    })
    .then(() => {
      res.status(200).redirect('/address/' + id)
    })
    .catch(err => {
      console.error(err)
      res.status(500).redirect('/500')

    }) 
  }
})


module.exports = router