import moment from 'moment'
import _ from 'lodash'

import {
  SET_INITIAL_DATE,
  GO_BACK_ONE_WEEK,
  GO_FORWARD_ONE_WEEK,
  SELECT_SLOT,
  ALLOCATE_SLOT,
} from '../types/types'

export const allocateSlot = updatedSchedule => ({
  type: ALLOCATE_SLOT,
  payload: updatedSchedule,
})

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
    return newDay.add(day, 'day')
  })
  const schedule = currentDatesArray.map(slotDate => ({
    date: slotDate,
    slots: hours.map(hour => ({
      dateOfSlot: slotDate.format('dddd Do MMM YYYY'),
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
