import anecdoteService from '../services/anecdotes'

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({ type: 'CREATE', data: newAnecdote })
  }
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({ type: 'INITIALIZE', data: anecdotes })
  }
}

export const voteAnecdote = (id) => {
  return async (dispatch) => {
    await anecdoteService.update(id)
    dispatch({ type: 'VOTE', data: { id: id } })
  }
}

const reducer = (state = [], action) => {
  switch(action.type) {
    case 'CREATE':
      return [...state, action.data]
    case 'VOTE':
      const id = action.data.id
      const anecdoteToUpdate = state.find(anecdote => anecdote.id === id)
      const updatedAnecdote = {
        content: anecdoteToUpdate.content,
        id: anecdoteToUpdate.id,
        votes: anecdoteToUpdate.votes + 1
      }
      const updatedState = state.map(anecdote => anecdote.id === id ? updatedAnecdote : anecdote)
      const sortedState = updatedState.sort((a, b) => b.votes - a.votes)
      return sortedState
    case 'INITIALIZE':
      return action.data
    default:
      return state
  }
}

export default reducer
