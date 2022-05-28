import { useEffect, useState } from 'react'
import axios from 'axios'

import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

const App = () => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [persons, setPersons] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

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
      axios
        .post('http://localhost:3001/persons', person)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })
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
