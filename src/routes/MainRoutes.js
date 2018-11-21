import React from 'react'
import { Route } from 'react-router-dom'

import PropTypes from 'prop-types'

import TeacherLandingPage from '../containers/TeacherLandingPage/TeacherLandingPage'
import TeacherLogin from '../containers/TeacherLogin/TeacherLogin'
import WelcomePage from '../containers/WelcomePage/WelcomePage'
import VirtualClassroom from '../containers/VirtualClassroom/VirtualClassroom'
import StudentRecords from '../containers/StudentRecords/StudentRecords'

const MainRoutes = ({ history }) => (
  <div>
    <Route exact path="/" component={WelcomePage} />
    <Route history={history} path="/login" component={TeacherLogin} />
    <Route history={history} path="/teacher" component={TeacherLandingPage} />
    <Route history={history} path="/class" component={VirtualClassroom} />
    <Route history={history} path="/student-records" component={StudentRecords} />
  </div>
)

MainRoutes.propTypes = {
  history: PropTypes.object.isRequired,
}

export default MainRoutes