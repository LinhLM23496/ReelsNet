import { createSlice } from '@reduxjs/toolkit'
import { GlobalProps } from './global.types'

const initialState: GlobalProps = {
  loading: false
}

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    }
  }
})

export default globalSlice.reducer
