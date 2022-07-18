import Blog from './Blog'

const Blogs = ({ blogs, handleDelete, handleLike }) => (
  <table>
    <tbody>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleDelete={() => handleDelete(blog)}
          handleLike={() => handleLike(blog)}
        />
      ))}
    </tbody>
  </table>
)

export default Blogs
