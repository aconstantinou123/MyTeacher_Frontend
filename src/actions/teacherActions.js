import axios from 'axios'

import {
  GET_TEACHER
} from '../types/types'

export const getTeacherPending = () => ({ type: `${GET_TEACHER}_PENDING` })
export const getTeacherFulfilled = (payload) => ({
  type: `${GET_TEACHER}_FULFILLED`,
  payload,
})
export const getTeacherRejected = (err) => ({
  type: `${GET_TEACHER}_REJECTED`,
  payload: err.message
})

export const getTeacher = (email) => async (dispatch) => {
  dispatch(getTeacherPending())
  try{
    const response = await axios.get(`${process.env.TEACHER_URL}/email/${email}`)
    dispatch(getTeacherFulfilled(response.data))
  }
  catch (err) {
    dispatch(getTeacherRejected(err))
  }
}