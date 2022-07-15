import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const update = async (id) => {
  const anecdoteToUpdate = await axios.get(`${baseUrl}/${id}`)
  const data = anecdoteToUpdate.data
  const updatedAnecdote = {
    content: data.content,
    id: data.id,
    votes: data.votes + 1
  }
  const response = await axios.put(`${baseUrl}/${id}`, updatedAnecdote)
  return response.data
}

export default { createNew, getAll, update }
