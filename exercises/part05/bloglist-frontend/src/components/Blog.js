import { useState } from 'react'

const Blog = ({ blog, handleDelete, handleLike }) => {
  const [visible, setVisible] = useState(false)

  if (!visible) {
    return (
      <tr>
        <td>
          <button onClick={() => setVisible(true)}>
            + View
          </button>
        </td>
        <td>
          {blog.title}
        </td>
      </tr>
    )
  }

  return (
    <tr>
      <td>
        <button onClick={() => setVisible(false)}>
          - Hide
        </button>
      </td>
      <td>
        {blog.title}
      </td>
      <td>
        {blog.author}
      </td>
      <td>
        {blog.url}
      </td>
      <td>
        {blog.likes} {blog.likes === 1 ? "like" : "likes"}
      </td>
      <td>
        <button onClick={handleLike}>
          Like
        </button>
        <button onClick={handleDelete}>
          Delete
        </button>
      </td>
    </tr>
  )
}

export default Blog
