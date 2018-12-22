// import { WEBSOCKET_TYPES, SOCKET_DISCONNECTED, SOCKET_CONNECTING } from '../types/types'
import { Stomp } from '@stomp/stompjs'
import SockJS from 'sockjs-client'
import { MESSAGE_RECEIVED } from '../types/types'

let socket
let stompClient

const init = (store) => {
  socket = new SockJS('http://localhost:3005/ws')
  stompClient = Stomp.over(socket)
  const onConnected = () => {
    console.log('connected')
    const { username } = store.getState().teacher.teacher
    stompClient.subscribe(`/topic/public/${username}`, (message) => {
      console.log('subscribed')
      const parsedMessage = JSON.parse(message.body)
      store.dispatch({ type: MESSAGE_RECEIVED, payload: parsedMessage.content })
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

const emit = (message, username) => {
  if (message && stompClient) {
    const chatMessage = {
      sender: username,
      content: message,
      type: 'CHAT',
    }
    stompClient.send(`/app/chat.sendMessage/${username}`, {}, JSON.stringify(chatMessage))
  }
}


export { init, emit }
