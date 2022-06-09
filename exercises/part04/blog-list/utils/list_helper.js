const dummy = (blogs) => {
  return 1
}

const favoriteBlog = (blogs) => {
  const compare = (a, b) => a.likes - b.likes
  return blogs.sort(compare)[0]
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
  totalLikes
}
