import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, vote }) => {
  return (
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        <i>This anecdote has {anecdote.votes} votes</i> |
        <button onClick={() => vote(anecdote)}>
          vote
        </button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => 
    state.anecdotes.filter(anecdote => 
      anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
    )
  )

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote.id))
    dispatch(setNotification(`You have voted for anecdote "${anecdote.content}"`, 5))
  }

  return (
    <div>
      <h3>Anecdotes</h3>
      {anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          vote={vote}
        />
      )}
    </div>
  )
}

export default AnecdoteList
