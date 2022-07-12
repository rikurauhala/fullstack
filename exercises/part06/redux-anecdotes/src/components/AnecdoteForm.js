import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const create = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
  }

  return (
    <div>
      <h2>Create new</h2>
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
