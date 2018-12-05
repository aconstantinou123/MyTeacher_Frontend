import moment from 'moment'
import _ from 'lodash'
import axios from 'axios'
import { updateSchedule } from '../helperFunctions/scheduleFunctions'
import {
  advanceSevenDays, goBackSevenDays,
} from '../helperFunctions/timeFunctions'

import {
  SET_INITIAL_DATE,
  GO_BACK_ONE_WEEK,
  GO_FORWARD_ONE_WEEK,
  SELECT_SLOT,
  ALLOCATE_SLOT,
  GET_SCHEDULE,
  UPDATE_CLASS,
  DELETE_CLASS,
} from '../types/types'

export const deleteClassPending = () => ({ type: `${DELETE_CLASS}_PENDING` })
export const deleteClassFulfilled = (updatedSchedule, slotsRetrieved) => ({
  type: `${DELETE_CLASS}_FULFILLED`,
  payload: {
    updatedSchedule,
    slotsRetrieved,
  }
})
export const deleteClassRejected = (err) => ({
  type: `${DELETE_CLASS}_REJECTED`,
  payload: err.message,
})

export const deleteClass = (username, classId) => async (dispatch, getState) => {
  dispatch(deleteClassPending())
  try {
    const response = await axios.delete(`${process.env.SCHEDULE_URL}/${username}/${classId}`)
    const slotsRetrieved = response.data
    const { schedule } = getState()
    const updatedSchedule = updateSchedule(schedule.schedule, slotsRetrieved)
    dispatch(deleteClassFulfilled(updatedSchedule, response.data))
  }
  catch (err) {
    dispatch(deleteClassRejected(err))
  }
}

export const getSchedulePending = () => ({ type: `${GET_SCHEDULE}_PENDING` })
export const getScheduleFulfilled = (updatedSchedule, slotsRetrieved) => ({
  type: `${GET_SCHEDULE}_FULFILLED`,
  payload: {
    updatedSchedule,
    slotsRetrieved,
  },
})
export const getScheduleRejected = err => ({
  type: `${GET_SCHEDULE}_REJECTED`,
  payload: err.message,
})

export const getSchedule = username => async (dispatch, getState) => {
  dispatch(getSchedulePending())
  try {
    const response = await axios.get(`${process.env.SCHEDULE_URL}/${username}`)
    const slotsRetrieved = response.data
    const { schedule } = getState()
    const newSchedule = updateSchedule(schedule.schedule, slotsRetrieved)
    dispatch(getScheduleFulfilled(newSchedule, slotsRetrieved))
  } catch (err) {
    dispatch(getScheduleRejected(err))
  }
}

export const allocateSlotPending = () => ({ type: `${ALLOCATE_SLOT}_PENDING` })
export const allocateSlotFulfilled = (updatedSchedule, updatedSlots) => ({
  type: `${ALLOCATE_SLOT}_FULFILLED`,
  payload: {
    updatedSchedule,
    updatedSlots,
  },
})
export const allocateSlotRejected = err => ({
  type: `${ALLOCATE_SLOT}_REJECTED`,
  payload: err.message,
})

export const allocateSlot = (slotsToAllocate, schedule) => async (dispatch) => {
  dispatch(allocateSlotPending())
  try {
    const response = await axios.post(`${process.env.SCHEDULE_URL}`, slotsToAllocate)
    const updatedSchedule = updateSchedule(schedule, response.data)
    dispatch(allocateSlotFulfilled(updatedSchedule, response.data))
  } catch (err) {
    dispatch(allocateSlotRejected(err))
  }
}

export const selectSlot = (date, hour) => ({
  type: SELECT_SLOT,
  payload: {
    date,
    hour,
  },
})

export const setInitialDate = () => {
  const daysOfTheWeek = _.range(0, 7, 1)
  const hours = _.range(6, 24, 1)
  const currentDatesArray = daysOfTheWeek.map((day) => {
    const newDay = moment().startOf('isoWeek').clone()
    return newDay.add(day, 'day').format('dddd Do MMM YYYY')
  })
  const schedule = currentDatesArray.map(slotDate => ({
    date: slotDate,
    slots: hours.map(hour => ({
      date: slotDate,
      hour: `${hour}:00`,
      classType: null,
      username: null,
      classId: null,
      classLevel: null,
      classDescription: null,
      capacity: null,
      students: null,
      startTime: null,
      endTime: null,
    })),
  }))
  return {
    type: SET_INITIAL_DATE,
    payload: {
      initialDate: moment().startOf('isoWeek').format('dddd Do MMM YYYY'),
      currentDatesArray,
      schedule,
    },
  }
}

export const updateClassPending = () => ({ type: `${UPDATE_CLASS}_PENDING` })
export const updateClassFulfilled = (updatedSchedule, updatedSlots) => ({
  type: `${UPDATE_CLASS}_FULFILLED`,
  payload: {
    updatedSchedule,
    updatedSlots,
  },
})
export const updateClassRejected = err => ({
  type: `${UPDATE_CLASS}_REJECTED`,
  payload: err.message,
})

export const updateClass = (slotsToUpdate, schedule) => async (dispatch) => {
  dispatch(updateClassPending())
  try {
    const response = await axios.put(`${process.env.SCHEDULE_URL}/update`, slotsToUpdate)
    const updatedSchedule = updateSchedule(schedule, response.data)
    dispatch(updateClassFulfilled(updatedSchedule, response.data))
  } catch (err) {
    dispatch(updateClassRejected(err))
  }
}

export const advanceCalenderOneWeek = (schedule, slotsRetrievedFromDB) => {
  const nextWeek = schedule.map(date => ({
    date: advanceSevenDays(date.date),
    slots: date.slots.map(slot => ({
      ...slot,
      classType: null,
      username: null,
      classId: null,
      classLevel: null,
      classDescription: null,
      capacity: null,
      students: null,
      startTime: null,
      endTime: null,
      date: advanceSevenDays(date.date),
    })),
  }))
  const updatedSchedule = updateSchedule(nextWeek, slotsRetrievedFromDB)
  return {
    type: GO_FORWARD_ONE_WEEK,
    payload: updatedSchedule,
  }
}

export const goBackOneCalenderWeek = (schedule, slotsRetrievedFromDB) => {
  const previousWeek = schedule.map(date => ({
    date: goBackSevenDays(date.date),
    slots: date.slots.map(slot => ({
      ...slot,
      classType: null,
      username: null,
      classId: null,
      classLevel: null,
      classDescription: null,
      capacity: null,
      students: null,
      startTime: null,
      endTime: null,
      date: goBackSevenDays(date.date),
    })),
  }))
  const updatedSchedule = updateSchedule(previousWeek, slotsRetrievedFromDB)
  return {
    type: GO_BACK_ONE_WEEK,
    payload: updatedSchedule,
  }
}
