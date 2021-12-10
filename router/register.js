const { Router } = require('express')
const router = Router()
const User = require('../model/User')


router.get('/', (req, res) => {
  res.status(200).render('register')
})

router.post('/', async (req, res) => {
  const { name, occupation } = req.body
  let { newsletter } = req.body
  const error = []


  if (!name) error.push({ err: 'Insira um nome' })
  else if (name.trim() === '') error.push({ err: 'Nome invalido' })

  if (!occupation) error.push({ err: 'Insira uma ocupação' })
  else if (occupation.trim() === '') error.push({ err: 'Ocuoação invalida'})

  if (newsletter && newsletter === 'on') {newsletter = 1}
  else {newsletter = 0}


  if (error.length > 0) {
    return error.forEach(err => console.log(err));
  }
  else {
    await User.create({
      name: name.trim().toLowerCase(),
      occupation: occupation.trim().toLowerCase(),
      newsletter
    })
      .then(() => res.status(200).redirect('/'))
      .catch(err => console.error(err))
  }
})


module.exports = router