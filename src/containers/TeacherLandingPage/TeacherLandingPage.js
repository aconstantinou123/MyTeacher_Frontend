import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import * as videoChatActionCreators from '../../actions/videoChatActions'
import * as teacherActionCreators from '../../actions/teacherActions'
import * as authenticationActionCreators from '../../actions/authenticationActions'
import * as studentRecordActionCreators from '../../actions/studentRecordActions'

import './TeacherLandingPage.scss'

class TeacherLandingPage extends Component {
  componentWillMount() {
    const {
      generateToken,
    } = this.props
    generateToken()
  }

  componentWillReceiveProps(nextProps) {
    const { getStudentRecords, teacherFetched } = this.props
    if (!teacherFetched
      && nextProps.teacherFetched) {
      console.log('here')
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
            <h2>My Students</h2>
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
  generateToken: PropTypes.func.isRequired,
  teacher: PropTypes.object,
  teacherFetched: PropTypes.bool.isRequired,
  getStudentRecords: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    ...state.videoChat,
    ...state.teacher,
    ...state.studentRecords,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...videoChatActionCreators,
    ...teacherActionCreators,
    ...authenticationActionCreators,
    ...studentRecordActionCreators,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TeacherLandingPage)
