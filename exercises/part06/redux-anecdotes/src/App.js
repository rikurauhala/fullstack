import { useDispatch, useSelector } from 'react-redux'
import { createAnecdote, voteAnecdote } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const create = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
  }

  const vote = (id) => {
    dispatch(voteAnecdote(id))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            <i>This anecdote has {anecdote.votes} votes</i> |
            <button onClick={() => vote(anecdote.id)}>
              vote
            </button>
          </div>
        </div>
      )}
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

export default App
