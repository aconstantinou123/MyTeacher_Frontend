import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import * as videoChatActionCreators from '../../actions/videoChatActions'
import * as teacherActionCreators from '../../actions/teacherActions'

import './LandingPage.scss'

class LandingPage extends Component {
  constructor() {
    super()
    this.handleDisconnect = this.handleDisconnect.bind(this)
  }

  componentWillMount() {
    const { generateToken, getTeacher } = this.props
    generateToken()
    getTeacher('a_constantinou@hotmail.co.uk')
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

LandingPage.defaultProps = {
  activeRoom: null,
}

LandingPage.propTypes = {
  activeRoom: PropTypes.object,
  disconnectFromRoom: PropTypes.func.isRequired,
  generateToken: PropTypes.func.isRequired,
  connectToRoom: PropTypes.func.isRequired,
  hasJoinedRoom: PropTypes.bool.isRequired,
  getTeacher: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    ...state.videoChat,
    ...state.teacher,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...videoChatActionCreators, ...teacherActionCreators }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage)
