import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import * as videoChatActionCreators from '../../actions/videoChatActions'
import * as teacherActionCreators from '../../actions/teacherActions'
import * as authenticationActionCreators from '../../actions/authenticationActions'

import './TeacherLandingPage.scss'

class TeacherLandingPage extends Component {
  constructor() {
    super()
    this.handleDisconnect = this.handleDisconnect.bind(this)
  }

  componentWillMount() {
    const { generateToken, teacherLogin } = this.props
    generateToken()
    const body = {
      username: 'zonio-strings',
      password: 'password',
    }
    teacherLogin(body)
  }

  handleDisconnect() {
    const { activeRoom, disconnectFromRoom } = this.props
    activeRoom.disconnect()
    disconnectFromRoom(activeRoom)
  }

  render() {
    const { connectToRoom, hasJoinedRoom } = this.props
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
      </div>
    )
  }
}

TeacherLandingPage.defaultProps = {
  activeRoom: null,
}

TeacherLandingPage.propTypes = {
  activeRoom: PropTypes.object,
  disconnectFromRoom: PropTypes.func.isRequired,
  generateToken: PropTypes.func.isRequired,
  connectToRoom: PropTypes.func.isRequired,
  hasJoinedRoom: PropTypes.bool.isRequired,
  // getTeacher: PropTypes.func.isRequired,
  teacherLogin: PropTypes.func.isRequired,

}

function mapStateToProps(state) {
  return {
    ...state.videoChat,
    ...state.teacher,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...videoChatActionCreators,
    ...teacherActionCreators,
    ...authenticationActionCreators,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TeacherLandingPage)
