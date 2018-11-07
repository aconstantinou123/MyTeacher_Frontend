import {
  TEACHER_LOGIN
} from '../types/types'

const defaultState = {
  teacherLoggingIn: false,
  teacherLoggedIn: false,
  teacherLoginErr: null,
}

export default function(state = defaultState, action){
  switch(action.type){
    case `${TEACHER_LOGIN}_PENDING`:
      return {
        ...state,
        teacherLoggingIn: true
      }
    case `${TEACHER_LOGIN}_FULFILLED`:
      return {
        ...state,
        teacherLoggingIn: false,
        teacherLoggedIn: true,
        teacherLoginErr: null,
      }
    case `${TEACHER_LOGIN}_REJECTED`:
      return {
        ...state,
        teacherLoggingIn: false,
        teacherLoggedIn: false,
        teacherLoginErr: action.payload
      }
    default:
      return state
  }
}