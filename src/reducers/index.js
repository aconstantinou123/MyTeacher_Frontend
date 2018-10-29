import { combineReducers } from 'redux'
import videoChat from '../reducers/videoChatReducer'

const rootReducer = combineReducers({
  videoChat,
})

export default rootReducer