import moment from 'moment'

import {
  SET_INITIAL_DATE,
  GO_BACK_ONE_WEEK,
  GO_FORWARD_ONE_WEEK,
} from '../types/types'

export const setInitialDate = () => ({
  type: SET_INITIAL_DATE,
  payload: moment().startOf('isoWeek'),
})

export const advanceCalenderOneWeek = () => ({
  type: GO_FORWARD_ONE_WEEK,
})

export const goBackOneCalenderWeek = () => ({
  type: GO_BACK_ONE_WEEK,
})
