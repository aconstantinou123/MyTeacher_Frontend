import { combineReducers } from 'redux'
import videoChat from './videoChatReducer'
import teacher from './teacherReducer'
import teacherAuthentication from './teacherAuthenticationReducer'
import studentRecords from './studentRecordReducer'

const rootReducer = combineReducers({
  videoChat,
  teacher,
  teacherAuthentication,
  studentRecords,
})

export default rootReducer
