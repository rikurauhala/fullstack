import { useSelector } from 'react-redux'

import Blog from './Blog'

const Blogs = () => {
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
          />
        ))}
      </tbody>
    </table>
  )
}

export default Blogs
