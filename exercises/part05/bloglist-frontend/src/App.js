import { useEffect, useState } from 'react'

import Blogs from './components/Blogs'
import LoggedInView from './components/LoggedInView'
import LoginForm from './components/LoginForm'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const userJSON = window.localStorage.getItem('user')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      setUser(user)
    }
  }, [])

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
    } catch (exception) {
      console.error(exception)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('user')
      setUser(null)
    } catch (exception) {
      console.error(exception)
    }
  }

  return (
    <div>
      <h2>Bloglist</h2>
      
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
          <LoggedInView user={user} handleLogout={handleLogout} />
          <h3>Blogs</h3>
          <Blogs blogs={blogs} />
        </div>
      }
    </div>
  )
}

export default App
