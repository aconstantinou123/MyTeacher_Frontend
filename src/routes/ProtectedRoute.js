import React from 'react'
import {
  Route,
  Redirect,
} from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const ProtectedRoute = ({
  teacherLoginErr, component: ComponentToRender, ...rest
}) => (
  <Route
    {...rest}
    render={props => (
      teacherLoginErr ? (
        <Redirect to="/login" />
      ) : (
        <ComponentToRender {...props} />
      )
    )}
  />
)

ProtectedRoute.defaultProps = {
  teacherLoginErr: null,
}

ProtectedRoute.propTypes = {
  path: PropTypes.string.isRequired,
  teacherLoginErr: PropTypes.string,
}

function mapStateToProps(state) {
  return {
    ...state.teacherAuthentication,
  }
}

export default connect(mapStateToProps)(ProtectedRoute)
