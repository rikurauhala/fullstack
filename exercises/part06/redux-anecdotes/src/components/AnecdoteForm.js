import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const create = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    await anecdoteService.createNew(content)
    dispatch(createAnecdote(content))
    dispatch({
      type: 'notifications/showNotification',
      payload: `You have created anecdote "${content}"`
    })
    setTimeout(() => {
      dispatch({
        type: 'notifications/clearNotification'
      })
    }, 5000)
  }

  return (
    <div>
      <h3>Create new</h3>
      <form onSubmit={create}>
        <input
          name="anecdote"
          placeholder="New anecdote"
        />
        <button type="submit">
          create
        </button>
      </form>
    </div>
  )
}

export default AnecdoteForm
