import { createSlice } from '@reduxjs/toolkit'

const initialState = 'Initial notification'

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: initialState,
  reducers: {
    showNotification(state, action) {
      const message = action.payload
      state = message
    }
  }
})

export const { showNotification } = notificationSlice.actions
export default notificationSlice.reducer
