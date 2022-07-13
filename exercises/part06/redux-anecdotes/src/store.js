import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from './reducers/anecdoteReducer'

const reducer = combineReducers({
  anecdotes: anecdoteReducer
})

const store = configureStore({reducer})

export default store
