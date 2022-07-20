import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'

import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'

const reducer = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer
})

const store = configureStore({ reducer })

export default store
