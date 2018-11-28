import {
  advanceSevenDays,
  goBackSevenDays
} from '../helperFunctions/timeFunctions'

import {
  SET_INITIAL_DATE,
  GO_FORWARD_ONE_WEEK,
  GO_BACK_ONE_WEEK,
  SELECT_SLOT,
  ALLOCATE_SLOT,
} from '../types/types'

const defaultState = {
  initialDate: null,
  currentDates: null,
  schedule: null,
  selectedSlot: {
    date: null,
    hour: null,
  },
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case SET_INITIAL_DATE:
      return {
        ...state,
        initialDate: action.payload.initialDate,
        currentDates: action.payload.currentDatesArray,
        schedule: action.payload.schedule,
      }
    case GO_FORWARD_ONE_WEEK:
      return {
        ...state,
        initialDate: advanceSevenDays(state.initialDate),
        currentDates: state.currentDates.map(date => date.clone().add(7, 'days')),
        schedule: state.schedule.map(date => ({
          date: date.date.clone().add(7, 'days'),
          slots: date.slots.map(slot => ({
            ...slot,
            classType: null,
            dateOfSlot: date.date.clone().add(7, 'days').format('dddd Do MMM YYYY'),
          })),
        })),
      }
    case GO_BACK_ONE_WEEK:
      return {
        ...state,
        initialDate: goBackSevenDays(state.initialDate),
        currentDates: state.currentDates.map(date => date.clone().subtract(7, 'days')),
        schedule: state.schedule.map(date => ({
          date: date.date.clone().subtract(7, 'days'),
          slots: date.slots.map(slot => ({
            ...slot,
            classType: null,
            dateOfSlot: date.date.clone().subtract(7, 'days').format('dddd Do MMM YYYY'),
          })),
        })),
      }
    case SELECT_SLOT:
      return {
        ...state,
        selectedSlot: {
          ...state.selectedSlot,
          date: action.payload.date,
          hour: action.payload.hour,

        },
      }
    case ALLOCATE_SLOT:
      return {
        ...state,
        schedule: action.payload,
        selectedSlot: {
          date: null,
          hour: null,
        }
      }
    default:
      return state
  }
}
