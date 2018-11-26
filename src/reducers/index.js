import { combineReducers } from 'redux'
import videoChat from './videoChatReducer'
import teacher from './teacherReducer'
import teacherAuthentication from './teacherAuthenticationReducer'
import studentRecords from './studentRecordReducer'
import schedule from './scheduleReducer'

const rootReducer = combineReducers({
  videoChat,
  teacher,
  teacherAuthentication,
  studentRecords,
  schedule,
})

export default rootReducer
