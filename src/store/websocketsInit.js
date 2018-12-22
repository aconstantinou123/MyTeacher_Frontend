// import { WEBSOCKET_TYPES, SOCKET_DISCONNECTED, SOCKET_CONNECTING } from '../types/types'
import { Stomp } from '@stomp/stompjs'
import SockJS from 'sockjs-client'
import {
  MESSAGE_RECEIVED,
  VOCAB_MESSAGE,
  GRAMMAR_MESSAGE,
  AIMS_MESSAGE,
  MISC_MESSAGE,
} from '../types/types'

let socket
let stompClient

const sendMessageToReducer = (message, store) => {
  switch (message.type) {
    case 'VOCAB':
      return store.dispatch({ type: VOCAB_MESSAGE, payload: message.content })
    case 'GRAMMAR':
      return store.dispatch({ type: GRAMMAR_MESSAGE, payload: message.content })
    case 'AIMS':
      return store.dispatch({ type: AIMS_MESSAGE, payload: message.content })
    case 'MISC':
      return store.dispatch({ type: MISC_MESSAGE, payload: message.content })
    default:
      return store.dispatch({ type: MESSAGE_RECEIVED, payload: message.content })
  }
}


const init = (store) => {
  socket = new SockJS('http://localhost:3005/ws')
  stompClient = Stomp.over(socket)
  const onConnected = () => {
    console.log('connected')
    const { username } = store.getState().teacher.teacher
    stompClient.subscribe(`/topic/public/${username}`, (message) => {
      console.log('subscribed')
      const parsedMessage = JSON.parse(message.body)
      sendMessageToReducer(parsedMessage, store)
    })
    stompClient.send(`/app/chat.addUser/${username}`,
      {},
      JSON.stringify({ sender: username, type: 'JOIN' }))
  }


  const onError = (error) => {
    console.log('disconnect', error.message)
    stompClient.connect({}, onConnected, onError)
  }

  stompClient.connect({}, onConnected, onError)
}

const emit = (message, username, type) => {
  if (message && stompClient) {
    const chatMessage = {
      sender: username,
      content: message,
      type,
    }
    stompClient.send(`/app/chat.sendMessage/${username}`, {}, JSON.stringify(chatMessage))
  }
}


export { init, emit }
