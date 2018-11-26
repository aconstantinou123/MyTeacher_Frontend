import React from 'react'
import { Route, Switch } from 'react-router-dom'

import PropTypes from 'prop-types'

import TeacherLandingPage from '../containers/TeacherLandingPage/TeacherLandingPage'
import TeacherLogin from '../containers/TeacherLogin/TeacherLogin'
import WelcomePage from '../containers/WelcomePage/WelcomePage'
import VirtualClassroom from '../containers/VirtualClassroom/VirtualClassroom'
import StudentRecords from '../containers/StudentRecords/StudentRecords'
import PrivateRoute from './PrivateRoute'
import Schedule from '../containers/Schedule/Schedule'

const MainRoutes = ({ history }) => (
  <div>
    <Switch>
      <Route exact path="/" component={WelcomePage} />
      <Route history={history} path="/login" component={TeacherLogin} />
      <PrivateRoute history={history} path="/teacher" ComponentToRender={TeacherLandingPage} />
      <PrivateRoute history={history} path="/class" ComponentToRender={VirtualClassroom} />
      <PrivateRoute path="/student-records" ComponentToRender={StudentRecords} />
      <PrivateRoute path="/schedule" ComponentToRender={Schedule} />
    </Switch>
  </div>
)

MainRoutes.propTypes = {
  history: PropTypes.object.isRequired,
}

export default MainRoutes
