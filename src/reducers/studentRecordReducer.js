import {
  GET_STUDENT_RECORDS,
} from '../types/types'

const defaultState = {
  studentRecordsFetching: false,
  studentRecordsFetched: false,
  studentRecords: [],
  studentRecordsErr: null,
}

export default function(state = defaultState, action){
  switch(action.type){
    case `${GET_STUDENT_RECORDS}_PENDING`:
      return {
        ...state,
        studentRecordsFetching: true
      }
    case `${GET_STUDENT_RECORDS}_FULFILLED`:
      return {
        ...state,
        studentRecordsFetching: false,
        studentRecordsFetched: true,
        studentRecords: action.payload,
        studentRecordsErr: null,
      }
    case `${GET_STUDENT_RECORDS}_REJECTED`:
      return {
        studentRecordsFetching: false,
        studentRecordsFetched: false,
        studentRecordsErr: action.payload,
      }
    default: 
      return state
  }
}