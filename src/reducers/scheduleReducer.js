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
  allocatingSlot: false,
  allocatedSlot: false,
  allocateSlotError: null,
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
  slotsRetrievedFromDB: null,
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case `${GET_SCHEDULE}_PENDING`:
      return {
        ...state,
        fetchingSchedule: true,
      }
    case `${GET_SCHEDULE}_FULFILLED`:
      return {
        ...state,
        fetchingSchedule: false,
        fetchedSchedule: true,
        schedule: action.payload.updatedSchedule,
        slotsRetrievedFromDB: action.payload.slotsRetrieved,
        scheduleError: null,
      }
    case `${GET_SCHEDULE}_REJECTED`:
      return {
        ...state,
        fetchingSchedule: false,
        fetchedSchedule: false,
        scheduleError: action.payload,
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
        schedule: action.payload,
      }
    case GO_BACK_ONE_WEEK:
      return {
        ...state,
        initialDate: goBackSevenDays(state.initialDate),
        currentDates: state.currentDates.map(date => goBackSevenDays(date)),
        schedule: action.payload,
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
    case `${ALLOCATE_SLOT}_PENDING`:
      return {
        ...state,
        allocatingSlot: true,
      }
    case `${ALLOCATE_SLOT}_FULFILLED`:
      return {
        ...state,
        allocatingSlot: false,
        allocatedSlot: true,
        schedule: action.payload.updatedSchedule,
        slotsRetrievedFromDB: action.payload.updatedSlots,
        allocateSlotError: null,
        selectedSlot: {
          date: null,
          hour: null,
        }
      }
    case `${ALLOCATE_SLOT}_REJECTED`:
      return {
        ...state,
        allocatingSlot: false,
        allocatedSlot: false,
        allocateSlotError: action.payload,
      }
    default:
      return state
  }
}
