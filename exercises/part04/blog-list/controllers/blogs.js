const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'Token missing or invalid!' })
  }

  const user = await User.findById(decodedToken.id)
  const blog = await Blog.findById(id)

  if (!blog) {
    response.status(400).json({ error: 'No blog found!' })
  } else if (blog.user.toString() === user._id.toString()) {
    await Blog.findByIdAndRemove(id)
    response.status(204).end()
  } else {
    response.status(401).json({ error: 'Invalid user!' })
  }
})

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'Token missing or invalid!' })
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  if (!blog.title) {
    return response.status(400).json({ error: 'Title is missing!' })
  }

  if (!blog.url) {
    return response.status(400).json({ error: 'Url is missing!' })
  }

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const likes = request.body.likes
  const blog = { likes: likes + 1 }
  const updatedBlog = await Blog.findByIdAndUpdate(id, blog)
  response.json(updatedBlog)
})

module.exports = blogsRouter
