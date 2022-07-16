import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const create = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(content)
    props.setNotification(`You have created anecdote "${content}"`, 5)
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

const mapDispatchToProps = { createAnecdote, setNotification }
const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm
