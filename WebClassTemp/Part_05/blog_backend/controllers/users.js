const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs')

  response.json(users)
})

usersRouter.get('/:id', async (request, response, next) => {
  try {
    const user = await User.findById(request.params.id);
    if (user) {
      response.json(user);
    } else {
      response.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

usersRouter.delete('/:id', async (request, response, next) => {
  try {
    const user = await User.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (error) {
    next(error);
  }
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if(password.length < 3) {
    response.status(400).json({      error: 'Password must be at least 3 characters long'})
  } else {
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
}
})

module.exports = usersRouter
