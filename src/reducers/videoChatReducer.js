import {
  GENERATE_TOKEN
} from '../types/types'

const defaultState = {
  videoTokenFetching: false,
  videoTokenFetched: false,
  videoToken: null,
  videoTokenErr: null,
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case `${GENERATE_TOKEN}_PENDING`:
      return { ...state, videoTokenFetching: true }
    case `${GENERATE_TOKEN}_FULFILLED`:
      return {
        ...state,
        videoTokenFetching: false,
        videoTokenFetched: true,
        videoToken: action.payload
      }
    case `${GENERATE_TOKEN}_REJECTED`:
      return {
        ...state,
        videoTokenFetching: false,
        videoTokenFetched: false,
        videoTokenErr: action.payload
      }
    default:
      return state 
  }
}