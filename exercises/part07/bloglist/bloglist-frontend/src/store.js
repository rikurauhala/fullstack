import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'

import notificationReducer from './reducers/notificationReducer'

const reducer = combineReducers({
  notification: notificationReducer
})

const store = configureStore({ reducer })

export default store
