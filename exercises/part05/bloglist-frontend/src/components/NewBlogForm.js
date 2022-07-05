const NewBlogForm = (props) => {
  const { handleNewBlogCreation, title, setTitle, author, setAuthor, url, setUrl } = props
  return (
    <form onSubmit={handleNewBlogCreation}>
      <table>
        <tbody>
          <tr>
            <td>
              Title
            </td>
            <td>
              <input
                name="Title"
                onChange={({ target }) => setTitle(target.value)}
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
                name="Author"
                onChange={({ target }) => setAuthor(target.value)}
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
                name="URL"
                onChange={({ target }) => setUrl(target.value)}
                placeholder='URL'
                type="text"
                value={url}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <button type="submit">Create</button>
    </form>
  )
}
  
export default NewBlogForm
