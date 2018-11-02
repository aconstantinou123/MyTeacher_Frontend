import { combineReducers } from 'redux'
import videoChat from './videoChatReducer'
import teacher from './teacherReducer'

const rootReducer = combineReducers({
  videoChat,
  teacher,
})

export default rootReducer
