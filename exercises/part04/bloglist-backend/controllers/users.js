const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs')
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({
      error: 'Username must be unique'
    })
  } else if (!username) {
    return response.status(400).json({
      error: 'Username is required'
    })
  } else if (!password) {
    return response.status(400).json({
      error: 'Password is required'
    })
  } else if (username.length <= 3) {
    return response.status(400).json({
      error: 'Username must contain at least 3 characters'
    })
  } else if (password.length <= 3) {
    return response.status(400).json({
      error: 'Password must contain at least 3 characters'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter
