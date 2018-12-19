import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import * as videoChatActionCreators from '../../actions/videoChatActions'
import * as teacherActionCreators from '../../actions/teacherActions'
import * as authenticationActionCreators from '../../actions/authenticationActions'

import './VirtualClassroom.scss'
import WebSocketBoard from '../../components/WebSocketBoard/WebSocketBoard'
// import Board from '../../components/Board/Board';

class VirtualClassroom extends Component {
  constructor() {
    super()
    this.handleDisconnect = this.handleDisconnect.bind(this)
  }

  handleDisconnect() {
    const { activeRoom, disconnectFromRoom } = this.props
    activeRoom.disconnect()
    disconnectFromRoom(activeRoom)
  }

  render() {
    const { connectToRoom, hasJoinedRoom, dataReceived } = this.props
    return (
      <div className="test">
Video Chat Test
        <div ref={(remoteMedia) => { this.remoteMedia = remoteMedia }} className="media-container" />
        <div ref={(localMedia) => { this.localMedia = localMedia }} className="media-container" />
        {
          !hasJoinedRoom
          && <button type="button" onClick={() => connectToRoom(this.localMedia, this.remoteMedia)}>Connect</button>
        }
        {
          hasJoinedRoom
          && <button type="button" onClick={this.handleDisconnect}>Disconnect</button>
        }
        {/* <Board dataReceived={dataReceived}/> */}
         <WebSocketBoard dataRecieved={dataReceived} />
      </div>
    )
  }
}

VirtualClassroom.defaultProps = {
  activeRoom: null,
  dataReceived: null,
}

VirtualClassroom.propTypes = {
  activeRoom: PropTypes.object,
  disconnectFromRoom: PropTypes.func.isRequired,
  connectToRoom: PropTypes.func.isRequired,
  hasJoinedRoom: PropTypes.bool.isRequired,
  dataReceived: PropTypes.string
}

function mapStateToProps(state) {
  return {
    ...state.videoChat,
    ...state.teacher,
    ...state.websocket,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...videoChatActionCreators,
    ...teacherActionCreators,
    ...authenticationActionCreators,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(VirtualClassroom)
