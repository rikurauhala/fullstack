import { createSlice } from '@reduxjs/toolkit'

let timeoutId

export const setNotification = (message, time) => {
  return async (dispatch) => {
    dispatch({
      type: 'notifications/showNotification',
      payload: message
    })
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      dispatch({
        type: 'notifications/clearNotification'
      })
    }, time * 1000)
  }
}

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: '',
  reducers: {
    showNotification(state, action) {
      return action.payload
    },
    clearNotification(state, action) {
      return ''
    }
  }
})

export default notificationSlice.reducer
