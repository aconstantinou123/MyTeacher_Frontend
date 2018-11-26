import {
  SET_INITIAL_DATE,
  GO_FORWARD_ONE_WEEK,
  GO_BACK_ONE_WEEK,
  SELECT_SLOT,
} from '../types/types'

const defaultState = {
  initialDate: null,
  currentDates: null,
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
      }
    case GO_FORWARD_ONE_WEEK:
      return {
        ...state,
        initialDate: state.initialDate.clone().add(7, 'days'),
        currentDates: state.currentDates.map(date => date.clone().add(7, 'days')),
      }
    case GO_BACK_ONE_WEEK:
      return {
        ...state,
        initialDate: state.initialDate.clone().subtract(7, 'days'),
        currentDates: state.currentDates.map(date => date.clone().subtract(7, 'days')),
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
    default:
      return state
  }
}
