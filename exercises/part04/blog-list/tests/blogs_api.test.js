const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')

const urlBlogs = '/api/blogs'
const urlLogin = '/api/login'
const urlUsers = '/api/users'

describe('Tests', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
    await api.post(urlUsers).send(helper.user)
  })

  test('blogs are returned as json', async () => {
    await api
      .get(urlBlogs)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('creating a new blog succeeds', async () => {
    const user = await api
      .post(urlLogin)
      .send(helper.user)
    const token = user.body.token
    console.log(user.body)
    const header = { 'Authorization': `bearer ${token}` }

    await api
      .post(urlBlogs)
      .send(helper.blog)
      .set(header)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get(urlBlogs)

    const numberOfBlogs = response.body.length
    const initialNumberOfBlogs = helper.initialBlogs.length
    expect(numberOfBlogs).toBe(initialNumberOfBlogs+1)

    const created = numberOfBlogs-1
    expect(response.body[created].author).toBe(helper.blog.author)
    expect(response.body[created].likes).toBe(helper.blog.likes)
    expect(response.body[created].title).toBe(helper.blog.title)
    expect(response.body[created].url).toBe(helper.blog.url)
  })

  test('deleting a blog succeeds', async () => {
    const response = await api.get(urlBlogs)
    const id = response.body[0].id

    await api
      .delete(`${urlBlogs}/${id}`)
      .expect(204)

    const response2 = await api.get(urlBlogs)
    const numberOfBlogs = response2.body.length
    const initialNumberOfBlogs = helper.initialBlogs.length
    expect(numberOfBlogs).toBe(initialNumberOfBlogs-1)
  })

  test('updating a blog succeeds', async () => {
    const blogsBefore = await helper.blogsInDb()
    const blogToUpdate = blogsBefore[0]

    await api
      .put(`${urlBlogs}/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect('Content-Type', /application\/json/)

    const blogsAfter = await helper.blogsInDb()
    const likesBefore = blogToUpdate.likes
    const likesAfter = blogsAfter[0].likes
    expect(likesAfter).toBe(likesBefore + 1)
  })

  test('id is defined', async () => {
    const response = await api.get(urlBlogs)
    const id = response.body[0].id
    expect(id).toBeDefined()
  })

  test('missing likes property returns 0', async () => {
    await api
      .post(urlBlogs)
      .send(helper.blogWithoutLikes)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get(urlBlogs)

    const likes = response.body[response.body.length-1].likes
    expect(likes).toBe(0)
  })

  test('missing title or url return status code 400', async () => {
    const responseTitle = await api
      .post(urlBlogs)
      .send(helper.blogWithoutTitle)
      .expect(400)

    const errorMessageTitle = responseTitle.body.error
    expect(errorMessageTitle).toBe('Title is missing!')

    const responseUrl = await api
      .post(urlBlogs)
      .send(helper.blogWithoutUrl)
      .expect(400)

    const errorMessageUrl = responseUrl.body.error
    expect(errorMessageUrl).toBe('Url is missing!')
  })

  test('there is a correct number of blogs', async () => {
    const response = await api.get(urlBlogs)
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
