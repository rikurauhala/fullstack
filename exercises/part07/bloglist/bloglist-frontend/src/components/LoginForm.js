import PropTypes from 'prop-types'

const LoginForm = ({
  handleLogin,
  username,
  setUsername,
  password,
  setPassword
}) => {
  return (
    <form onSubmit={handleLogin}>
      <table>
        <tbody>
          <tr>
            <td>Username</td>
            <td>
              <input
                id="username"
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
                placeholder="Username"
                type="text"
                value={username}
              />
            </td>
          </tr>
          <tr>
            <td>Password</td>
            <td>
              <input
                id="password"
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
                placeholder="Password"
                type="password"
                value={password}
              />
            </td>
            <td>
              <button id="login-button" type="submit">
                Log in
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired
}

export default LoginForm
