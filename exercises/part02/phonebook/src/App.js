import { useState } from 'react'

import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

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
      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      <Persons
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
        searchResults={searchResults}
      />
    </div>
  )
}

export default App
