import Blog from './Blog'

const Blogs = ({ blogs }) => (
  <table>
    <tbody>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </tbody>
  </table>
)

export default Blogs
