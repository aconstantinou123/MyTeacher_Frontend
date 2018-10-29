import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as videoChatActionCreators from '../../actions/videoChatActions'
import PropTypes from 'prop-types'

import './LandingPage.scss'

class LandingPage extends Component {

  componentWillMount(){
    const { generateToken } = this.props
    generateToken()
  }

  render(){
    return (
    <div className="test">CSS Test
      <h1 className="test2">
        Test 2
      </h1>
    </div>
    )
  }
}

LandingPage.propTypes = {
  generateToken: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    ...state. videoChat,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...videoChatActionCreators }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage)