import { createSlice } from '@reduxjs/toolkit'

let timeoutId

export const setNotification = (message) => {
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
    }, 5000)
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
      console.log(state, action)
      return ''
    }
  }
})

export default notificationSlice.reducer
