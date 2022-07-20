import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

import Blogs from './components/Blogs'
import LoggedInView from './components/LoggedInView'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'

import { createBlog, deleteBlog, initializeBlogs, likeBlog } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const userJSON = window.localStorage.getItem('user')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password
      })
      window.localStorage.setItem('user', JSON.stringify(user))
      setPassword('')
      setUser(user)
      setUsername('')
      dispatch(setNotification('Welcome to Bloglist!'))
    } catch (exception) {
      dispatch(setNotification('Failed to log in!'))
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('user')
      setUser(null)
      dispatch(setNotification('See you!'))
    } catch (exception) {
      console.error(exception)
      dispatch(setNotification('Failed to log out!'))
    }
  }

  const createNewBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    try {
      dispatch(createBlog(newBlog))
      dispatch(setNotification('New blog created!'))
    } catch (exception) {
      console.error(exception)
      dispatch(setNotification('Failed to create a new blog!'))
    }
  }

  const handleDelete = async (blog) => {
    try {
      const answer = window.confirm(`Are you sure you want to delete blog "${blog.title}"?`)
      if (answer) {
        dispatch(deleteBlog(blog.id))
        dispatch(setNotification(`Deleted blog ${blog.title}!`))
      }
    } catch (exception) {
      console.error(exception)
      dispatch(setNotification(`Failed to delete blog ${blog.title}!`))
    }
  }

  const handleLike = async (blog) => {
    try {
      dispatch(likeBlog(blog))
      dispatch(setNotification(`Like added to blog ${blog.title}!`))
    } catch (exception) {
      console.error(exception)
      dispatch(setNotification(`Failed to like blog ${blog.title}!`))
    }
  }

  const blogFormRef = useRef()

  return (
    <div>
      <h2>Bloglist</h2>
      <Notification />
      {user === null ? (
        <div>
          <h3>Login</h3>
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
          />
        </div>
      ) : (
        <div>
          <LoggedInView user={user} handleLogout={handleLogout} />
          <h3>Create a new blog</h3>
          <Togglable buttonLabel="Create" ref={blogFormRef}>
            <NewBlogForm createNewBlog={createNewBlog} />
          </Togglable>
          <h3>Blogs</h3>
          <Blogs
            handleLike={handleLike}
            handleDelete={handleDelete}
          />
        </div>
      )}
    </div>
  )
}

export default App
