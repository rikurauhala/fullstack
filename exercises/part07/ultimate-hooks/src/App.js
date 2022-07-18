import { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    axios
      .get(baseUrl)
      .then(response => {
        setResources(response.data)
      })
  }, [baseUrl])

  const create = (resource) => {
    axios
      .post(baseUrl, resource)
      .then(response => {
        setResources(resources.concat(response.data))
      })
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
  }
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value})
  }

  return (
    <div>
      <h2>Notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} placeholder='Content' />
        <button>create</button>
      </form>
      <ul>
        {notes.map(n => <li key={n.id}>{n.content}</li>)}
      </ul>

      <h2>Persons</h2>
      <form onSubmit={handlePersonSubmit}>
        <input {...name} placeholder='Name' /> <br/>
        <input {...number} placeholder='Number' />
        <button>create</button>
      </form>
      <ul>
        {persons.map(n => <li key={n.id}>{n.name} {n.number}</li>)}
      </ul>
    </div>
  )
}

export default App
