const { Router } = require('express')
const router = Router()
const User = require('../model/User')


router.get('/', (req, res) => {
  res.status(200).render('register')
})

router.post('/', async (req, res) => {
  const { name, occupation } = req.body
  let { newsletter } = req.body
  const error = {}
  
  
  if (!name) error.insertName = 'Insira um nome' 
  else if (name.trim() === '') error.invalidName = 'Nome invalido'
  
  if (!occupation) error.push({ insertOccupation: 'Insira uma ocupação' })
  else if (occupation.trim() === '') error.push({ invalidOccupation: 'Ocuoação invalida'})
  
  if (newsletter && newsletter === 'on') {newsletter = 1}
  else {newsletter = 0}
  

  if (JSON.stringify(error) !== '{}') {
    res.status(401).render('register', { err: error })
  }
  else {
    // await User.create({
    //   name: name.trim().toLowerCase(),
    //   occupation: occupation.trim().toLowerCase(),
    //   newsletter
    // })
    //   .then(() => res.status(200).redirect('/'))
    //   .catch(err => console.error(err))
  }
})


module.exports = router