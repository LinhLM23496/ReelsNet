import { createSlice } from '@reduxjs/toolkit'
import { GlobalProps } from './global.types'

const initialState: GlobalProps = {
  users: []
}

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload
    },
    resetUsers: (state) => {
      state.users = []
    }
  }
})

export default globalSlice.reducer
