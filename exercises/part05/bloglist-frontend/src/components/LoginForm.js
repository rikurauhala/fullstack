const LoginForm = ({ handleLogin, username, setUsername, password, setPassword }) => {
  return (
    <form onSubmit={handleLogin}>
      <table>
        <tbody>
          <tr>
            <td>
              Username
            </td>
            <td>
              <input
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
                placeholder='Username'
                type="text"
                value={username}
              />
            </td>
          </tr>
          <tr>
            <td>
              Password
            </td>
            <td>
              <input
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
                placeholder='Password'
                type="password"
                value={password}
              />
            </td>
            <td>
              <button type="submit">Log in</button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  )
}
  
export default LoginForm
