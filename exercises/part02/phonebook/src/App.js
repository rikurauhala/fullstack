import { useState } from 'react'

const Person = ({ name, number }) => {
  return (
    <li>{name} {number}</li>
  )
}

const App = () => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [persons, setPersons] = useState([
    { name: 'Mickey Mouse', number: 1313 },
    { name: 'Donald Duck', number: 313 },
  ])

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

  const handleNameChange = (event) => setNewName(event.target.value)

  const handleNumberChange = (event) => setNewNumber(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>Name: <input value={newName} onChange={handleNameChange} /></div>
        <div>Number: <input value={newNumber} onChange={handleNumberChange} /></div>
        <div><button type="submit">+ Add</button></div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => 
          <Person key={person.name} name={person.name} number={person.number} />
        )}
      </ul>
    </div>
  )
}

export default App
