import { useEffect } from 'react'

import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import SearchFilter from './components/SearchFilter'

import { replaceAnecdotes } from './reducers/anecdoteReducer'
import anecdoteService from './services/anecdotes'
import store from './store'

const App = () => {
  useEffect(() => {
    anecdoteService.getAll().then(anecdotes =>
      store.dispatch(replaceAnecdotes(anecdotes))
    )
  }, [])

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
