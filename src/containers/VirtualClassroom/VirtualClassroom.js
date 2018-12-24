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
    this.studentWebCamCSS = this.studentWebCamCSS.bind(this)
  }

  componentDidMount() {
    const {
      teacher,
      generateToken,
    } = this.props
    if (teacher) {
      generateToken(teacher.username)
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      teacher,
      generateToken,
    } = this.props
    if (teacher !== nextProps.teacher && nextProps.teacher.username) {
      generateToken(nextProps.teacher.username)
    }
  }

  studentWebCamCSS() {
    const { numberOfParticipants } = this.props
    switch (numberOfParticipants) {
      case 1:
        return 'student-video-one'
      case 2:
        return 'student-video-two'
      case 3:
        return 'student-video-three'
      case 4:
        return 'student-video-four'
      case 5:
      case 6:
        return 'student-video-six'
      default:
        return 'student-video-one'
    }
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
    console.log(this.studentWebCamCSS())
    return (
      <div className="classroom-container">
        <div className="student-container">
          <div
            ref={(remoteMedia) => { this.remoteMedia = remoteMedia }}
            className={this.studentWebCamCSS()}
          />
        </div>
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
        <div ref={(localMedia) => { this.localMedia = localMedia }} className="teacher-container" />
        <div className="chat-box">
          {
            !hasJoinedRoom
            && <button type="button" onClick={() => connectToRoom(this.localMedia, this.remoteMedia)}>Connect</button>
          }
          {
            hasJoinedRoom
            && <button type="button" onClick={this.handleDisconnect}>Disconnect</button>
          }
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
  generateToken: PropTypes.func.isRequired,
  teacher: PropTypes.object,
  activeRoom: PropTypes.object,
  disconnectFromRoom: PropTypes.func.isRequired,
  connectToRoom: PropTypes.func.isRequired,
  hasJoinedRoom: PropTypes.bool.isRequired,
  numberOfParticipants: PropTypes.number.isRequired,
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
