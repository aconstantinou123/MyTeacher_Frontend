import { combineReducers } from 'redux'
import videoChat from './videoChatReducer'
import teacher from './teacherReducer'
import teacherAuthentication from './teacherAuthenticationReducer'

const rootReducer = combineReducers({
  videoChat,
  teacher,
  teacherAuthentication
})

export default rootReducer
