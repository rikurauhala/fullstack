import { useState } from 'react'

const Person = ({ name, number }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{number}</td>
    </tr>
  )
}

const App = () => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [persons, setPersons] = useState([
    { name: 'Mickey Mouse', number: "123-456789" },
    { name: 'Donald Duck', number: "313-313313" },
    { name: 'Scrooge McDuck', number: "999-999999" },
  ])
  const [searchTerm, setSearchTerm] = useState('')

  const searchResults = searchTerm.length > 0
    ? persons.filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : persons

  const addPerson = (event) => {
    event.preventDefault()
    const contains = persons.findIndex(person => person.name === newName)
    if (contains !== -1) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const person = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(person))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleSearchChange = (event) => {setSearchTerm(event.target.value)}

  const handleNameChange = (event) => setNewName(event.target.value)

  const handleNumberChange = (event) => setNewNumber(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <h3>Add new person</h3>
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
      <h3>Numbers</h3>
      <table>
        <tbody>
          <tr>
            <td>
              Search
            </td>
            <td>
              <input value={searchTerm} onChange={handleSearchChange} />
            </td>
          </tr>
        </tbody>
      </table>
      <table>
        <thead>
          <tr>
            <th>
              Name
            </th>
            <th>
              Number
            </th>
          </tr>
        </thead>
        <tbody>
          {searchResults.map(person => 
            <Person key={person.name} name={person.name} number={person.number} />
          )}
        </tbody>
      </table>
    </div>
  )
}

export default App
