const PersonForm = (props) => {
  const { addPerson, newName, handleNameChange, newNumber, handleNumberChange } = props
  return (
    <form onSubmit={addPerson}>
      <table>
        <tbody>
          <tr>
            <td>
              Name
            </td>
            <td>
              <input value={newName} onChange={handleNameChange} />
            </td>
          </tr>
          <tr>
            <td>
              Number
            </td>
            <td>
              <input value={newNumber} onChange={handleNumberChange} />
            </td>
            <td>
              <button type="submit">+ Add</button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  )
}

export default PersonForm
