import React from 'react'
import { Route, Switch } from 'react-router-dom'

import PropTypes from 'prop-types'

import TeacherLandingPage from '../containers/TeacherLandingPage/TeacherLandingPage'
import TeacherLogin from '../containers/TeacherLogin/TeacherLogin'
import WelcomePage from '../containers/WelcomePage/WelcomePage'
import VirtualClassroom from '../containers/VirtualClassroom/VirtualClassroom'
import StudentRecords from '../containers/StudentRecords/StudentRecords'
import ProtectedRoute from './ProtectedRoute'
import Schedule from '../containers/Schedule/Schedule'

const MainRoutes = ({ history }) => (
  <div>
    <Switch>
      <Route exact path="/" component={WelcomePage} />
      <Route history={history} path="/login" component={TeacherLogin} />
      <ProtectedRoute history={history} path="/teacher" component={TeacherLandingPage} />
      <ProtectedRoute history={history} path="/class" component={VirtualClassroom} />
      <ProtectedRoute path="/student-records" component={StudentRecords} />
      <ProtectedRoute path="/schedule" component={Schedule} />
    </Switch>
  </div>
)

MainRoutes.propTypes = {
  history: PropTypes.object.isRequired,
}

export default MainRoutes
