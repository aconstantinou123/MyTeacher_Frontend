import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import './WelcomePage.scss'

const WelcomePage = ({ teacher }) => {
    return(
      <div>
        <h1>myTeacher</h1>
        <p>Welcome to myTeacher. Please login to continue or proceed your account</p>
        {
          teacher &&
          <Link to="/teacher">Go to Teacher Page</Link>
        }
        {
          !teacher &&
          <Link to="login">Login </Link>
        }
      </div>
    )
}

WelcomePage.defaultProps = {
  teacher: null,
}

WelcomePage.propTypes = {
  teacher: PropTypes.object,
}

function mapStateToProps(state){
  return {
    ...state.teacher
  }
}

export default connect(mapStateToProps)(WelcomePage)
