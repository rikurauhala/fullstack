const jwt = require('jsonwebtoken')
const logger = require('./logger')
const User = require('../models/user')

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)
  if (error.name === 'CastError') {
    return response
      .status(400)
      .send({ error: 'Malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response
      .status(400)
      .json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response
      .status(401).json({
        error: 'Invalid token'
      })
  } else if (error.name === 'TypeError') {
    return response
      .status(400).json({
        error: error.message
      })
  }
  next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  } else {
    request.token = null
  }
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'Unknown endpoint' })
}

const userExtractor = async (request, response, next) => {
  const token = request.token
  if (!token) {
    request.user = null
  } else {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken.id) {
      request.user = null
    } else {
      request.user = await User.findById(decodedToken.id)
    }
  }
  next()
}

module.exports = {
  errorHandler,
  tokenExtractor,
  unknownEndpoint,
  userExtractor
}
