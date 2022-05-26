import { useState } from 'react'

const Person = ({ name }) => {
  return (
    <li>{name}</li>
  )
}

const App = () => {
  const [newName, setNewName] = useState('')
  const [persons, setPersons] = useState([
    { name: 'Mickey Mouse' },
    { name: 'Donald Duck' }
  ])

  const addPerson = (event) => {
    event.preventDefault()
    const contains = persons.findIndex(person => person.name === newName)
    if (contains !== -1) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const person = {
        name: newName
      }
      setPersons(persons.concat(person))
      setNewName('')
    }
  }

  const handleNameChange = (event) => setNewName(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <input
          value={newName}
          onChange={handleNameChange}
        />
        <button type="submit">add</button>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(persons => 
          <Person key={persons.name} name={persons.name} />
        )}
      </ul>
    </div>
  )
}

export default App
