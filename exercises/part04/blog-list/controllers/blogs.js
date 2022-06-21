const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

const createBlogObject = (body) => {
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  })
  return blog
}

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
  const blog = createBlogObject(request.body)

  if (!blog.title) {
    return response.status(400).json({ error: 'Title is missing!' })
  }

  if (!blog.url) {
    return response.status(400).json({ error: 'Url is missing!' })
  }

  const result = await blog.save()
  response.status(201).json(result)
})

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const likes = request.body.likes
  const blog = { likes: likes + 1 }
  const updatedBlog = await Blog.findByIdAndUpdate(id, blog)
  response.json(updatedBlog)
})

module.exports = blogsRouter
