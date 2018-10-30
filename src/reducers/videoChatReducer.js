import {
  GENERATE_TOKEN,
  CONNECT_TO_ROOM,
  DISCONNECT_FROM_ROOM,
} from '../types/types'

const defaultState = {
  videoTokenFetching: false,
  videoTokenFetched: false,
  videoToken: null,
  videoTokenErr: null,
  connectingToRoom: false,
  connectedToRoom: false,
  identity: null,
  roomName: '',
  previewTracks: null,
  localMediaAvailable: false,
  hasJoinedRoom: false,
  activeRoom: null,
  localParticipant: null,
  connectionError: null,
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case DISCONNECT_FROM_ROOM:
      return {
        ...state,
        connectingToRoom: false,
        connectedToRoom: false,
        roomName: '',
        previewTracks: null,
        localMediaAvailable: false,
        hasJoinedRoom: false,
        activeRoom: action.payload,
        connectionError: null,
      }
    case `${CONNECT_TO_ROOM}_PENDING`:
      return { ...state, connectingToRoom: true }
    case `${CONNECT_TO_ROOM}_FULFILLED`:
      return {
        ...state,
        connectingToRoom: false,
        connectedToRoom: true,
        roomName: action.payload.name,
        previewTracks: null,
        localMediaAvailable: true,
        hasJoinedRoom: true,
        activeRoom: action.payload,
        localParticipant: action.payload.localParticipant,
        connectionError: null,
      }
    case `${CONNECT_TO_ROOM}_REJECTED`:
      return {
        ...state,
        connectingToRoom: false,
        connectedToRoom: false,
        roomName: '',
        roomNameErr: false,
        previewTracks: null,
        localMediaAvailable: false,
        hasJoinedRoom: false,
        activeRoom: null,
        localParticipant: null,
        connectionError: action.payload,
      }
    case `${GENERATE_TOKEN}_PENDING`:
      return { ...state, videoTokenFetching: true }
    case `${GENERATE_TOKEN}_FULFILLED`:
      return {
        ...state,
        videoTokenFetching: false,
        videoTokenFetched: true,
        identity: action.payload.identity,
        videoToken: action.payload.token,
        videoTokenErr: null,
      }
    case `${GENERATE_TOKEN}_REJECTED`:
      return {
        ...state,
        videoTokenFetching: false,
        videoTokenFetched: false,
        identity: null,
        videoToken: null,
        videoTokenErr: action.payload,
      }
    default:
      return state
  }
}
