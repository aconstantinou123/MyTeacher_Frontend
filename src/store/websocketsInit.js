// import { WEBSOCKET_TYPES, SOCKET_DISCONNECTED, SOCKET_CONNECTING } from '../types/types'
import { MESSAGE_RECEIVED } from '../types/types'
import { Stomp } from '@stomp/stompjs'
import SockJS from 'sockjs-client'

let socket = new SockJS('http://localhost:3005/ws')
const stompClient = Stomp.over(socket)
stompClient.maxWebSocketFrameSize = 64 * 1024

const init = (store) => {

  const onConnected = () => {
    stompClient.subscribe('/topic/public', (message) => {
      const parsedMessage = JSON.parse(message.body)
      store.dispatch({type: MESSAGE_RECEIVED, payload: parsedMessage.content})
    })
    stompClient.send("/app/chat.addUser",
        {},
        JSON.stringify({sender: 'Alex', type: 'JOIN'})
    )
  }


  const onError = (error) => {   
    console.log('disconnect', error.message)
    stompClient.connect({}, onConnected, onError)
  }
 
  
  stompClient.connect({}, onConnected, onError)
    
}

const emit = (message) => {
  if(message && stompClient) {
      const chatMessage = {
          sender: 'Alex',
          content: message,
          type: 'CHAT'
      }
      stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage))
  }
}


export { init, emit }
