import axios from 'axios'
import store from '../store/store'
import { init } from '../store/websocketsInit'

import {
  GET_TEACHER,
} from '../types/types'

export const getTeacherPending = () => ({ type: `${GET_TEACHER}_PENDING` })
export const getTeacherFulfilled = payload => ({
  type: `${GET_TEACHER}_FULFILLED`,
  payload,
})
export const getTeacherRejected = err => ({
  type: `${GET_TEACHER}_REJECTED`,
  payload: err.message,
})

export const getTeacher = username => async (dispatch) => {
  dispatch(getTeacherPending())
  try {
    const response = await axios.get(`${process.env.TEACHER_URL}/username/${username}`)
    dispatch(getTeacherFulfilled(response.data))
    init(store)
  } catch (err) {
    dispatch(getTeacherRejected(err))
  }
}
