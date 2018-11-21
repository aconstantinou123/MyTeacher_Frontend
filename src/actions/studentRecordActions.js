import axios from 'axios'

import {
  GET_STUDENT_RECORDS,
} from '../types/types'

export const getStudentRecordsPending = () => ({ type: `${GET_STUDENT_RECORDS}_PENDING` })
export const getStudentRecordsFulfilled = payload => ({
  type: `${GET_STUDENT_RECORDS}_FULFILLED`,
  payload,
})
export const getStudentRecordsRejected = err => ({
  type: `${GET_STUDENT_RECORDS}_REJECTED`,
  payload: err.message,
})

export const getStudentRecords = username => async (dispatch) => {
  dispatch(getStudentRecordsPending())
  try {
    const url = `${process.env.STUDENT_RECORD_URL}/teacher/${username}`
    const response = await axios.get(url)
    dispatch(getStudentRecordsFulfilled(response.data))
  } catch (err) {
    dispatch(getStudentRecordsRejected(err))
  }
}
