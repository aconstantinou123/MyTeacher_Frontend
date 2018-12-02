import {
  advanceSevenDays,
  goBackSevenDays,
} from '../helperFunctions/timeFunctions'

import {
  SET_INITIAL_DATE,
  GO_FORWARD_ONE_WEEK,
  GO_BACK_ONE_WEEK,
  SELECT_SLOT,
  ALLOCATE_SLOT,
  GET_SCHEDULE,
} from '../types/types'

const defaultState = {
  fetchingSchedule: false,
  fetchedSchedule: false,
  scheduleError: null,
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
    case `${GET_SCHEDULE}_PENDING`:
      return {
        ...state,
        fetchingSchedule: true
      }
    case `${GET_SCHEDULE}_FULFILLED`:
      return {
        ...state,
        fetchingSchedule: false,
        fetchedSchedule: true,
        schedule: action.payload,
        scheduleError: null,
      }
    case `${GET_SCHEDULE}_REJECTED`:
      return {
        ...state,
        fetchingSchedule: false,
        fetchedSchedule: false,
        scheduleError: action.payload
      }
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
        currentDates: state.currentDates.map(date => advanceSevenDays(date)),
        schedule: state.schedule.map(date => ({
          date: advanceSevenDays(date.date),
          slots: date.slots.map(slot => ({
            ...slot,
            classType: null,
            dateOfSlot: advanceSevenDays(date.date),
          })),
        })),
      }
    case GO_BACK_ONE_WEEK:
      return {
        ...state,
        initialDate: goBackSevenDays(state.initialDate),
        currentDates: state.currentDates.map(date => goBackSevenDays(date)),
        schedule: state.schedule.map(date => ({
          date: goBackSevenDays(date.date),
          slots: date.slots.map(slot => ({
            ...slot,
            classType: null,
            dateOfSlot: goBackSevenDays(date.date),
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
        },
      }
    default:
      return state
  }
}
