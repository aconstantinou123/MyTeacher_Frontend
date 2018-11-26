import moment from 'moment'
import _ from 'lodash'

import {
  SET_INITIAL_DATE,
  GO_BACK_ONE_WEEK,
  GO_FORWARD_ONE_WEEK,
  SELECT_SLOT,
} from '../types/types'

export const selectSlot = (date, hour) => {
  return {
    type: SELECT_SLOT,
    payload: {
      date,
      hour,
    }
  }
}

export const setInitialDate = () => {
  const daysOfTheWeek = _.range(0, 7, 1)
  const currentDatesArray = daysOfTheWeek.map((day) => {
    const newDay = moment().startOf('isoWeek').clone()
    return newDay.add(day, 'day')
  }) 
  return {
  type: SET_INITIAL_DATE,
  payload: {
    initialDate: moment().startOf('isoWeek'),
    currentDatesArray,    
    }
  }
}

export const advanceCalenderOneWeek = () => ({
  type: GO_FORWARD_ONE_WEEK,
})

export const goBackOneCalenderWeek = () => ({
  type: GO_BACK_ONE_WEEK,
})
