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
} from '../types/types'

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

export const allocateSlot = (slotToAllocate, schedule) => async (dispatch) => {
  dispatch(allocateSlotPending())
  try {
    const response = await axios.post(`${process.env.SCHEDULE_URL}`, [slotToAllocate])
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

export const advanceCalenderOneWeek = (schedule, slotsRetrievedFromDB) => {
  const nextWeek = schedule.map(date => ({
    date: advanceSevenDays(date.date),
    slots: date.slots.map(slot => ({
      ...slot,
      classType: null,
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
      date: goBackSevenDays(date.date),
    })),
  }))
  const updatedSchedule = updateSchedule(previousWeek, slotsRetrievedFromDB)
  return {
    type: GO_BACK_ONE_WEEK,
    payload: updatedSchedule,
  }
}
