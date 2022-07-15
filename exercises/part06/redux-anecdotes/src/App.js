import { useEffect } from 'react'

import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import SearchFilter from './components/SearchFilter'

import { initializeAnecdotes } from './reducers/anecdoteReducer'

import store from './store'

const App = () => {
  useEffect(() => {
    store.dispatch(initializeAnecdotes())
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
