import { combineReducers } from '@reduxjs/toolkit'
import globalReducer from './global/global.reducer'
import modalReducer from './modal/modal.reducer'

const rootReducer = combineReducers({
  global: globalReducer,
  modal: modalReducer
})

export default rootReducer
