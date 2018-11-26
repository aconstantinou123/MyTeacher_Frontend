import {
  SET_INITIAL_DATE,
  GO_FORWARD_ONE_WEEK,
  GO_BACK_ONE_WEEK,
} from '../types/types'

const defaultState = {
  initialDate: null,
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case SET_INITIAL_DATE:
      return {
        ...state,
        initialDate: action.payload,
      }
    case GO_FORWARD_ONE_WEEK:
      return {
        ...state,
        initialDate: state.initialDate.clone().add(7, 'days'),
      }
    case GO_BACK_ONE_WEEK:
      return {
        ...state,
        initialDate: state.initialDate.clone().subtract(7, 'days'),
      }
    default:
      return state
  }
}
