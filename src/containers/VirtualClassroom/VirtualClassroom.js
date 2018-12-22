import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import * as videoChatActionCreators from '../../actions/videoChatActions'
import * as teacherActionCreators from '../../actions/teacherActions'
import * as authenticationActionCreators from '../../actions/authenticationActions'

import WebSocketBoard from '../../components/WebSocketBoard/WebSocketBoard'

import './VirtualClassroom.scss'

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
    const {
      connectToRoom, hasJoinedRoom, teacher,
    } = this.props
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
        <div className="boards-container">
        <WebSocketBoard
          messageType="VOCAB"
          teacher={teacher}
        />
        <WebSocketBoard
          messageType="GRAMMAR"
          teacher={teacher}
        />
        <WebSocketBoard
          messageType="AIMS"
          teacher={teacher}
        />
        <WebSocketBoard
          messageType="MISC"
          teacher={teacher}
        />
        </div>
      </div>
    )
  }
}

VirtualClassroom.defaultProps = {
  activeRoom: null,
  teacher: null,
}

VirtualClassroom.propTypes = {
  teacher: PropTypes.object,
  activeRoom: PropTypes.object,
  disconnectFromRoom: PropTypes.func.isRequired,
  connectToRoom: PropTypes.func.isRequired,
  hasJoinedRoom: PropTypes.bool.isRequired,
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
