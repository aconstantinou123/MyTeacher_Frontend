import React from 'react'
import {
  Route,
  Redirect,
} from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const PrivateRoute = ({
  path, teacherLoginErr, ComponentToRender, ...rest
}) => (
  <Route
    {...rest}
    exact
    path={path}
    render={props => (
      teacherLoginErr ? (
        <Redirect to="/login" />
      ) : (
        <ComponentToRender {...props} />
      )
    )}
  />
)


PrivateRoute.defaultProps = {
  teacherLoginErr: null,
}

PrivateRoute.propTypes = {
  path: PropTypes.string.isRequired,
  teacherLoginErr: PropTypes.string,
}

function mapStateToProps(state) {
  return {
    ...state.teacherAuthentication,
  }
}

export default connect(mapStateToProps)(PrivateRoute)
