import { useSelector } from 'react-redux'

import Blog from './Blog'

const Blogs = ({ handleLike, handleDelete }) => {
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
            handleDelete={() => handleDelete(blog)}
          />
        ))}
      </tbody>
    </table>
  )
}

export default Blogs
