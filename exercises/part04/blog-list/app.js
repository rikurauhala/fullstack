const blogsRouter = require('./controllers/blogs')
const loginRouter = require('./controllers/login')
const usersRouter = require('./controllers/users')
const middleware = require('./utils/middleware')
const config = require('./utils/config')
const logger = require('./utils/logger')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

require('express-async-errors')

const url = config.MONGODB_URI
logger.info('Connecting to', url)
mongoose.connect(url)
  .then(() => {
    logger.info('Connected to MongoDB')
  })
  .catch((error) => {
    logger.info('Error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)
app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)

app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

module.exports = app
