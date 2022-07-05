import { useEffect, useState } from 'react'

import Blogs from './components/Blogs'
import LoggedInView from './components/LoggedInView'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationStatus, setNotificationStatus] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  })

  useEffect(() => {
    const userJSON = window.localStorage.getItem('user')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const setMessage = (status, message) => {
    setNotificationMessage(message)
    setNotificationStatus(status)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'user', JSON.stringify(user)
      ) 
      setPassword('')
      setUser(user)
      setUsername('')
      setMessage(
        'success',
        `Welcome to Bloglist!`
      )
    } catch (exception) {
      console.error(exception)
      setMessage(
        'error',
        `Failed to log in!`
      )
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('user')
      setUser(null)
      setMessage(
        'success',
        `See you!`
      )
    } catch (exception) {
      console.error(exception)
      setMessage(
        'error',
        `Failed to log out!`
      )
    }
  }

  const handleNewBlogCreation = async (event) => {
    event.preventDefault() 
    try {
      await blogService.create({
        title: title,
        author: author,
        url: url,
        likes: 0
      })
      setTitle('')
      setAuthor('')
      setUrl('')
      setMessage(
        'success',
        `New blog created!`
      )
    } catch (exception) {
      console.error(exception)
      setMessage(
        'error',
        `Failed to create a new blog!`
      )
    }
  }

  return (
    <div>
      <h2>Bloglist</h2>
      <Notification message={notificationMessage} status={notificationStatus} />
      {
        user === null ?
        <div>
          <h3>Login</h3>
          <LoginForm 
            handleLogin={handleLogin}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
          />
        </div> :
        <div>
          <LoggedInView
            user={user}
            handleLogout={handleLogout}
          />
          <h3>Create a new blog</h3>
          <Togglable buttonLabel='Create'>
            <NewBlogForm
              handleNewBlogCreation={handleNewBlogCreation}
              title={title}
              setTitle={setTitle}
              author={author}
              setAuthor={setAuthor}
              url={url}
              setUrl={setUrl}
            />
          </Togglable>
          <h3>Blogs</h3>
          <Blogs blogs={blogs} />
        </div>
      }
    </div>
  )
}

export default App
