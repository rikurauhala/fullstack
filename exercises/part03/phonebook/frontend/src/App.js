import { useEffect, useState } from 'react'

import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

import personService from './services/Persons'

const App = () => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [persons, setPersons] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [notificationStatus, setNotificationStatus] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const searchResults = searchTerm.length > 0
    ? persons.filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : persons

  const resetForms = () => {
    setNewName('')
    setNewNumber('')
  }

  const setNotification = (status, message) => {
    setNotificationStatus(status)
    setNotificationMessage(message)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const person = {
      name: newName,
      number: newNumber
    }
    const newPerson = persons.find(person => person.name === newName)
    if (newPerson !== undefined) {
      const question = `${newName} is already added! Replace the old number with a new one?`
      const answer = window.confirm(question)
      if (answer) {
        personService
          .update(newPerson.id, person)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== newPerson.id ? p : returnedPerson))
            resetForms()
            setNotification(
              'success',
              `Number of ${returnedPerson.name} was updated successfully!`
            )
          })
      }
    } else {
      personService
        .create(person)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          resetForms()
          setNotification(
            'success',
            `${newName} has been added successfully!`
          )
        })
        .catch(error => {
          setNotification(
            'error',
            `${error.response.data.error}`
          )
        })
    }
  }

  const deletePerson = (event, person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .deletePerson(person.id)
        .then(returnedPerson => {
          setPersons(persons.filter(p => p.id !== person.id))
          setNotification(
            'success',
            `Person ${person.name} was deleted successfully!`
          )
        })
        .catch(error => { 
          setNotification(
            'error',
            `${person.name} has already been deleted!`
          )
        })
    }
  }

  const handleSearchChange = (event) => {setSearchTerm(event.target.value)}

  const handleNameChange = (event) => setNewName(event.target.value)

  const handleNumberChange = (event) => setNewNumber(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notificationMessage} status={notificationStatus} />

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
        deletePerson={deletePerson}
      />
    </div>
  )
}

export default App
