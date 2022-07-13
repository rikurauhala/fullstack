import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const create = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
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
