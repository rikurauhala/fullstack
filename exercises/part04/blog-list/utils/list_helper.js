const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const favoriteBlog = (blogs) => {
  const compare = (a, b) => a.likes - b.likes
  return blogs.sort(compare)[0]
}

const mostBlogs = (blogs) => {
  const details = _(blogs).countBy('author').entries().maxBy(_.last)
  const result = {
    author: details[0],
    blogs: details[1]
  }
  return result
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0
  }

  const reducer = (sum, blog) => sum + blog.likes
  return blogs.reduce(reducer, 0)
}

module.exports = {
  dummy,
  favoriteBlog,
  mostBlogs,
  totalLikes
}
