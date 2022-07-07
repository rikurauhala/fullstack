import Blog from './Blog'

const Blogs = ({ blogs, handleDelete, handleLike }) => (
  <table>
    <tbody>
      <tr>
        {blogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            handleDelete={() => handleDelete(blog)}
            handleLike={() => handleLike(blog)}
          />
        )}
      </tr>
    </tbody>
  </table>
)

export default Blogs
