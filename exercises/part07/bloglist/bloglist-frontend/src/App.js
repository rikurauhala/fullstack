import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

import Blogs from './components/Blogs'
import LoggedInView from './components/LoggedInView'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'

import { setNotification } from './reducers/notificationReducer'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

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

  const createBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    try {
      const addedBlog = await blogService.create(newBlog)
      dispatch(setNotification('New blog created!'))
      setBlogs(blogs.concat(addedBlog))
    } catch (exception) {
      console.error(exception)
      dispatch(setNotification('Failed to create a new blog!'))
    }
  }

  const handleDelete = async (blog) => {
    try {
      const answer = window.confirm(
        `Are you sure you want to delete blog "${blog.title}"?`
      )
      if (answer) {
        await blogService.remove(blog.id)
        setBlogs(blogs.filter((currentBlog) => currentBlog.id !== blog.id))
        dispatch(setNotification(`Deleted blog ${blog.title}!`))
      }
    } catch (exception) {
      console.error(exception)
      dispatch(setNotification(`Failed to delete blog ${blog.title}!`))
    }
  }

  const handleLike = async (blog) => {
    try {
      await blogService.update(blog.id, blog)
      blogService.getAll().then((blogs) => setBlogs(blogs))
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
            <NewBlogForm createBlog={createBlog} />
          </Togglable>
          <h3>Blogs</h3>
          <Blogs
            blogs={blogs.sort((a, b) => b.likes - a.likes)}
            handleDelete={handleDelete}
            handleLike={handleLike}
          />
        </div>
      )}
    </div>
  )
}

export default App
