const _ = require('lodash')

const dummy = (blogs) => {
  console.log(blogs)
  return 1
}

const favoriteBlog = (blogs) => {
  const compare = (a, b) => a.likes - b.likes
  const result = blogs.sort(compare)[0]
  return result
}

const mostBlogs = (blogs) => {
  const details = _(blogs).countBy('author').entries().maxBy(_.last)
  const result = {
    author: details[0],
    blogs: details[1]
  }
  return result
}

const mostLikes = (blogs) => {
  const reducer = (result, blog) => {
    result[blog.author] = result[blog.author]
      ? result[blog.author] + blog.likes
      : blog.likes
    return result
  }
  const likes = blogs.reduce(reducer, [])
  const details = _(likes).entries().maxBy(_.last)
  const result = {
    author: details[0],
    likes: details[1]
  }
  return result
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0
  }
  const reducer = (sum, blog) => sum + blog.likes
  const result = blogs.reduce(reducer, 0)
  return result
}

module.exports = {
  dummy,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  totalLikes
}
