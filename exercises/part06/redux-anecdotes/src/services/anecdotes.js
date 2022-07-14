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

export default { createNew, getAll }
