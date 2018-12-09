import axios from 'axios'
import jwt from 'jsonwebtoken'
import { getTeacher } from './teacherActions'

import {
  TEACHER_LOGIN,
  PERSIST_LOGIN,
} from '../types/types'

export const teacherLoginPending = () => ({ type: `${TEACHER_LOGIN}_PENDING` })
export const teacherLoginFulfilled = payload => ({
  type: `${TEACHER_LOGIN}_FULFILLED`,
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

export const persistLoginPending = () => ({ type: `${PERSIST_LOGIN}_PENDING` })
export const persistLoginFulfilled = payload => ({
  type: `${PERSIST_LOGIN}_FULFILLD`,
  payload,
})
export const persistLoginRejected = err => ({
  type: `${PERSIST_LOGIN}_REJECTED`,
  payload: err.message,
})

export const persistLogin = () => async (dispatch) => {
  dispatch(persistLoginPending())
  try {
    const response = await axios.get(`${process.env.TEACHER_URL}/persist-login`)
    axios.defaults.headers.common.Authorization = response.headers.authorization
    const token = response.headers.authorization.split(' ')[1]
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      dispatch(getTeacher(decoded.sub))
    })
    dispatch(persistLoginFulfilled(response.data))
  } catch (err) {
    dispatch(persistLoginRejected(err))
  }
}
