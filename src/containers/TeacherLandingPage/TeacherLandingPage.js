import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import * as videoChatActionCreators from '../../actions/videoChatActions'
import * as teacherActionCreators from '../../actions/teacherActions'
import * as authenticationActionCreators from '../../actions/authenticationActions'
import * as studentRecordActionCreators from '../../actions/studentRecordActions'
import * as scheduleActionCreators from '../../actions/scheduleActions'

import './TeacherLandingPage.scss'

class TeacherLandingPage extends Component {
  componentWillMount() {
    const {
      teacher,
      getStudentRecords,
      getSchedule,
      generateToken,
    } = this.props
    generateToken()
    if (teacher) {
      getSchedule(teacher.username)
      getStudentRecords(teacher.username)
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      teacher,
      getStudentRecords,
      getSchedule,
    } = this.props
    const teacherReady = (teacher !== nextProps.teacher
    && nextProps.teacher.username !== null)
    if (teacherReady) {
      getSchedule(nextProps.teacher.username)
      getStudentRecords(nextProps.teacher.username)
    }
  }

  render() {
    const { teacher } = this.props
    return (
      <div className="test">
        {
        teacher
        && (
        <div>
          <h1>
Welcome
            {' '}
            {teacher.firstName}
          </h1>
          <div>
            <Link to="/student-records">My Students</Link>
            <br />
            <Link to="/schedule">Schedule</Link>
            <br />
            <Link to="class">Start Class</Link>
          </div>
        </div>
        )

      }
      </div>
    )
  }
}
TeacherLandingPage.defaultProps = {
  teacher: null,
}


TeacherLandingPage.propTypes = {
  getSchedule: PropTypes.func.isRequired,
  generateToken: PropTypes.func.isRequired,
  teacher: PropTypes.object,
  getStudentRecords: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    ...state.videoChat,
    ...state.teacher,
    ...state.teacherAuthentication,
    ...state.studentRecords,
    ...state.schedule,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...videoChatActionCreators,
    ...teacherActionCreators,
    ...authenticationActionCreators,
    ...studentRecordActionCreators,
    ...scheduleActionCreators,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TeacherLandingPage)
