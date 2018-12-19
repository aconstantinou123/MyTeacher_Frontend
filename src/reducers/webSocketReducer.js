import { MESSAGE_RECEIVED } from '../types/types'

const defaultState = {
  dataReceived: ''
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case MESSAGE_RECEIVED:
      return {
        ...state,
        dataReceived: action.payload
      }
    default:
      return state
  }
}