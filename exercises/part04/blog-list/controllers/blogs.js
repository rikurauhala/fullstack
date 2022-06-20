const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  await Blog.findByIdAndRemove(id)
  response.status(204).end()
})

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const newBlog = request.body

  if (!newBlog.title) {
    return response.status(400).json({ error: 'Title is missing!' })
  }

  if (!newBlog.url) {
    return response.status(400).json({ error: 'Url is missing!' })
  }

  const blog = new Blog({
    title: newBlog.title,
    author: newBlog.author,
    url: newBlog.url,
    likes: newBlog.likes || 0,
  })
  const result = await blog.save()
  response.status(201).json(result)
})

module.exports = blogsRouter
