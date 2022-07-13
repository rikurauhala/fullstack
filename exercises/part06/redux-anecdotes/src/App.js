import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import SearchFilter from './components/SearchFilter'

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <AnecdoteForm />
      <SearchFilter />
      <AnecdoteList />
    </div>
  )
}

export default App
