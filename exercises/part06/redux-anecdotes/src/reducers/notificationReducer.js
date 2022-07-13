import { createSlice } from '@reduxjs/toolkit'

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
