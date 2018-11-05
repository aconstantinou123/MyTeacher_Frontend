import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as authenticationActionCreators from '../../actions/authenticationActions'

class TeacherLogin extends Component {
  constructor(){
    super()
    this.state = {
      username: '',
      password: '',
      showPassword: false,
    }
    this.handleUsernameChange = this.handleUsernameChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.showPassword = this.showPassword.bind(this)
  }

  handleUsernameChange(event){
    const { target } = event
    this.setState(prevState => ({ ...prevState, username: target.value }))
  }

  handlePasswordChange(event){
    const { target } = event
    this.setState(prevState => ({ ...prevState, password: target.value }))
  }

  handleSubmit(event){
    event.preventDefault()
    const { teacherLogin } = this.props
    const { username, password } = this.state
    const userInfo = {
      username,
      password,
    }
    teacherLogin(userInfo)
  }

  showPassword(){
    const { showPassword } = this.state
    this.setState(prevState => ({ ...prevState, showPassword: !showPassword }))
  }

  render(){
    const { showPassword } = this.state
    return (
      <div>
        <h3>Teacher Login</h3>
        <form onSubmit={this.handleSubmit}>
        <label htmlFor="username">
          Username:{' '}
          <input
            id="username"
            type="input"
            onChange={this.handleUsernameChange}
          />
          </label>
          <label htmlFor="password">
          Password:{' '}
          <input
            id="password"
            type={showPassword ? 'input' : 'password'}
            onChange={this.handlePasswordChange}
          />
          </label>
          <button type="button" onClick={this.showPassword}>
          {showPassword ? 'Hide Password' : 'Show Password'}
          </button>
          <button type="submit">
            Submit
          </button>
        </form>
      </div>
    )
  }
}

TeacherLogin.propTypes = {
  teacherLogin: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    ...state.teacher,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...authenticationActionCreators,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TeacherLogin)