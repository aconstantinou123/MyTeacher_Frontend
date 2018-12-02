import moment from 'moment'
import _ from 'lodash'
import axios from 'axios'

import {
  SET_INITIAL_DATE,
  GO_BACK_ONE_WEEK,
  GO_FORWARD_ONE_WEEK,
  SELECT_SLOT,
  ALLOCATE_SLOT,
  GET_SCHEDULE,
} from '../types/types'

export const getSchedulePending = () => ({ type: `${GET_SCHEDULE}_PENDING` })
export const getScheduleFulfilled = payload => ({
  type: `${GET_SCHEDULE}_FULFILLED`,
  payload,
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
    const mapSlots = (slotsFound, slotToCheck) => {
      let returnedSlot = null
      slotsFound.forEach(slotFound => {
        if(slotToCheck.timeOfSlot === slotFound.hour
          && slotToCheck.dateOfSlot === slotFound.date){
            returnedSlot = slotFound
          }
       })
       return returnedSlot
    }
    const currentSchedule = schedule.schedule
    const newSchedule = currentSchedule
    .map(date => {
      return {
        ...date, 
        slots: date.slots.map(slot => {
            const newSlot = mapSlots(slotsRetrieved, slot)
            if(newSlot){
              return {
                ...newSlot
              }
            }
            else return slot
          })
        }
      })
      dispatch(getScheduleFulfilled(newSchedule))
    } catch (err) {
    dispatch(getScheduleRejected(err))
  }
}

export const allocateSlot = (updatedSchedule, selectedSlot) => {
  console.log(selectedSlot)
  return {
    type: ALLOCATE_SLOT,
    payload: updatedSchedule,
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
      dateOfSlot: slotDate,
      timeOfSlot: `${hour}:00`,
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

export const advanceCalenderOneWeek = () => ({
  type: GO_FORWARD_ONE_WEEK,
})

export const goBackOneCalenderWeek = () => ({
  type: GO_BACK_ONE_WEEK,
})
