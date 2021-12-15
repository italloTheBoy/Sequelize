const { Router } = require('express')
const router = Router()
const User = require('../../model/User')


router.get('/:id', async (req, res) => {
  const id = req.params.id

  try {
    const user = await User.findByPk(id, {raw: true})

    if (!user) res.redirect('/404')

    res.render('user/edit', { user })
  }
  catch (err) {
    throw console.error(err)
  }
})

router.post('/', async (req, res) => {
  const { id, name, occupation } = req.body
  let { newsletter } = req.body
  const err = {}


  //Valid
  try {
    const existId = await User.findByPk(id, {
      attributes: ['id']
    })

    if (!existId) res.redirect('/404')
  }
  catch (err) {
    throw console.error(err)
  }

  if (!name || name.trim() === '') {
    err.nameErr = 'Insira um nome.' 
  } 
  else {
    try {
      const username = await User.findOne({
        where: {name: name},
        attributes: ['name'], 
        raw: true,
      })

      if (username && username.name != name) {
        err.nameErr = 'Este nome ja esta sendo usado'
      }
    }
    catch (err) { throw console.error(err) }
  }

  if (!occupation || occupation.trim() === '') {
    error.occupationErr = 'Insira uma ocupação.'
  }

  if (newsletter === 'on') newsletter = true
  else newsletter = false


  //Redirect
  if (JSON.stringify(err) !== '{}') {
    const user = { 
      name: name.trim(),
      occupation: occupation.trim(),
      id, newsletter
    }

    res.status(401).render('edit', { user, err })
  }
  else {
    await User.update({ 
      name: name.trim().toLowerCase(),
      occupation: occupation.trim().toLowerCase(),
      newsletter,
    }, { where: {id} })
      .then(() => {
        res.redirect(`/search/${id}`)
      })
      .catch(err => {
        res.status(500).redirect('/500')
        throw console.error(err)
      })
  }  
})     


module.exports = router