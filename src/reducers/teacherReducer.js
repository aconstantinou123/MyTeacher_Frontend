import {
  GET_TEACHER
} from '../types/types'

const defaultState = {
  teacherFetching: false,
  teacherFetched: false,
  teacher: null,
  teacherErr: null
}

export default function (state = defaultState, action){
  switch(action.type) {
    case `${GET_TEACHER}_PENDING`:
      return {
        ...state,
        teacherFetching: true,
      }
    case `${GET_TEACHER}_FULFILLED`:
      return {
        ...state,
        teacherFetching: false,
        teacherFetched: true,
        teacher: action.payload,
        teacherErr: null,
      }
    case `${GET_TEACHER}_REJECTED`:
      return {
        ...state,
        teacherFetching: false,
        teacherFetched: false,
        teacher: null,
        teacherErr: action.payload
      }
    default:
      return state
  }
} 