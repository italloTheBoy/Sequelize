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
  
  if (!name || name.trim() === '') {
    error.nameErr = 'Insira um nome.' 
  } 
  else {
    await User.findOne({
      where: { name: name },
      attributes: ['name'],
      raw: true,
    })
      .then(user => {
        if (user) error.nameErr = 'O Usuario ja existe.'
      })
      .catch(error => console.error(error))
  }

  if (!occupation || occupation.trim() === '') {
    error.occupationErr = 'Insira uma ocupação.'
  }
  
  if (newsletter === 'on') newsletter = true
  else newsletter = false


  if (JSON.stringify(error) !== '{}') {
    res.status(401).render('register', { err: error })
  }
  else {
    await User.create({
      name: name.trim().toLowerCase(),
      occupation: occupation.trim().toLowerCase(),
      newsletter,
    })
      .then(() => res.status(200).redirect('/'))
      .catch(err => console.error(err))
  }
})


module.exports = router