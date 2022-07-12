import { useDispatch, useSelector } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import { voteAnecdote } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

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
      <AnecdoteForm />
    </div>
  )
}

export default App
