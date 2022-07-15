import { createSlice } from '@reduxjs/toolkit'

export const setNotification = (message, time) => {
  return async (dispatch) => {
    dispatch({
      type: 'notifications/showNotification',
      payload: message
    })
    setTimeout(() => {
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
      const message = action.payload
      return message
    },
    clearNotification(state, action) {
      return ''
    }
  }
})

export default notificationSlice.reducer
