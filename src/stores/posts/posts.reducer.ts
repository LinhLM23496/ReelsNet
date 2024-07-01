import { createSlice } from '@reduxjs/toolkit'
import { PostProps } from './posts.types'

const initialState: PostProps = {
  posts: [],
  users: [],
  currentIndex: 0
}

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload
    },
    setUsers: (state, action) => {
      state.users = action.payload
    },
    setCurrentIndex: (state, action) => {
      state.currentIndex = action.payload
    },
    updatePosts: (state, action) => {
      state.posts = [...state.posts, ...action.payload]
    },
    resetPosts: (state) => {
      state.posts = []
      state.currentIndex = 0
      state.users = []
    }
  }
})

export default postsSlice.reducer
