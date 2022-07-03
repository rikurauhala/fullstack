import { useEffect, useState } from 'react'

import Blog from './components/Blog'
import Blogs from './components/Blogs'
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

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      setPassword('')
      setUser(user)
      setUsername('')
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
          <span>
            Logged in as <b>{user.name}</b>
          </span>
          <h3>Blogs</h3>
          <Blogs blogs={blogs} />
        </div>
      }
    </div>
  )
}

export default App
