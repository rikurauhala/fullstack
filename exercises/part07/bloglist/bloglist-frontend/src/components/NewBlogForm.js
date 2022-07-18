import { useState } from 'react'

const NewBlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
      likes: 0
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <table>
        <tbody>
          <tr>
            <td>
              Title
            </td>
            <td>
              <input
                id="title"
                name="Title"
                onChange={handleTitleChange}
                placeholder='Title'
                type="text"
                value={title}
              />
            </td>
          </tr>
          <tr>
            <td>
              Author
            </td>
            <td>
              <input
                id="author"
                name="Author"
                onChange={handleAuthorChange}
                placeholder='Author'
                type="text"
                value={author}
              />
            </td>
          </tr>
          <tr>
            <td>
              URL
            </td>
            <td>
              <input
                id="url"
                name="URL"
                onChange={handleUrlChange}
                placeholder='URL'
                type="text"
                value={url}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <button id="create-button" type="submit">
        Create
      </button>
    </form>
  )
}

export default NewBlogForm
