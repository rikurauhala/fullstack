import { useSelector } from 'react-redux'

import Blog from './Blog'

const Blogs = ({ handleLike }) => {
  const blogs = useSelector(({ blogs }) => {
    return blogs
  })

  return (
    <table>
      <tbody>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleLike={() => handleLike(blog)}
          />
        ))}
      </tbody>
    </table>
  )
}

export default Blogs
