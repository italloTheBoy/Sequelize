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
    error.insertName = 'Insira um nome' 
  }

  if (!occupation || occupation.trim() === '') {
    error.insertOccupation = 'Insira uma ocupação'
  }
  
  if (newsletter === 'on') newsletter = true
  else newsletter = false
  console.log(newsletter)


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