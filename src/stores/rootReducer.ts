import { combineReducers } from '@reduxjs/toolkit'
import globalReducer from './global/global.reducer'
import modalReducer from './modal/modal.reducer'
import postsReducer from './posts/posts.reducer'

const rootReducer = combineReducers({
  global: globalReducer,
  modal: modalReducer,
  posts: postsReducer
})

export default rootReducer
