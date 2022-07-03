const LoggedInView = ({ handleLogout, user }) => {
  return (
    <table>
      <tbody>
        <tr>
          <td>
            Logged in as <b>{user.name}</b>
          </td>
          <td>
            <button onClick={handleLogout} type="submit">
              Log out
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  )
}
  
export default LoggedInView
