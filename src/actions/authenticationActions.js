import axios from 'axios'
import { getTeacher } from './teacherActions'

import {
  TEACHER_LOGIN,
} from '../types/types'

export const teacherLoginPending = () => ({ type: `${TEACHER_LOGIN}_PENDING` })
export const teacherLoginFulfilled = payload => ({
  type: `${TEACHER_LOGIN}_FULFILLD`,
  payload,
})
export const teacherLoginRejected = err => ({
  type: `${TEACHER_LOGIN}_REJECTED`,
  payload: err.message,
})

export const teacherLogin = details => async (dispatch) => {
  dispatch(teacherLoginPending())
  try {
    const response = await axios.post(`${process.env.TEACHER_URL}/login`, details)
    axios.defaults.headers.common.Authorization = response.headers.authorization
    dispatch(teacherLoginFulfilled(response.data))
    dispatch(getTeacher(details.username))
  } catch (err) {
    dispatch(teacherLoginRejected(err))
  }
}
