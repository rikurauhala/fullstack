import Blog from './Blog'

const Blogs = ({ blogs }) => (
  <table>
    <thead>
      <tr>
        <td>
          <b>
            Title
          </b>
        </td>
        <td>
          <b>
            Author
          </b>
        </td>
        <td>
          <b>
            URL
          </b>
        </td>
      </tr>
    </thead>
    <tbody>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </tbody>
  </table>
)

export default Blogs
