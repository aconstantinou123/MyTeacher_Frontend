import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import * as videoChatActionCreators from '../../actions/videoChatActions'
import * as teacherActionCreators from '../../actions/teacherActions'
import * as authenticationActionCreators from '../../actions/authenticationActions'

import './TeacherLandingPage.scss'

class TeacherLandingPage extends Component {
  componentWillMount() {
    const { generateToken, history, teacher } = this.props
    if (!teacher) {
      history.push('/login')
    }
    generateToken()
  }

  render() {
    const { teacher } = this.props
    return (
      <div className="test">
        <h1>
Welcome {teacher.firstName}
        </h1>
        <div>
          <h2>My Students</h2>
          <Link to="class">Start Class</Link>
        </div>
      </div>
    )
  }
}


TeacherLandingPage.propTypes = {
  generateToken: PropTypes.func.isRequired,
  teacher: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
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
