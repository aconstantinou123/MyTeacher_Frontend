import React from 'react'
import { Route } from 'react-router-dom'

import PropTypes from 'prop-types'

import TeacherLandingPage from '../containers/TeacherLandingPage/TeacherLandingPage'
import TeacherLogin from '../containers/TeacherLogin/TeacherLogin'

const MainRoutes = ({ history }) => (
  <div>
    <Route history={history} exact path="/" component={TeacherLogin} />
    <Route history={history} path="/teacher" component={TeacherLandingPage} />
  </div>
)

MainRoutes.propTypes = {
  history: PropTypes.object.isRequired,
}

export default MainRoutes
