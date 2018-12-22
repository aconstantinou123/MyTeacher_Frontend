import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { emit } from '../../store/websocketsInit'

import './WebSocketBoard.scss'

class WebSocketBoard extends Component {
  constructor() {
    super()
    this.timeOut = setTimeout
    this.state = { value: '' }
    this.handleInput = this.handleInput.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
  }

  handleKeyUp() {
    clearTimeout(this.timeOut)
    this.timeOut = setTimeout(() => {
      if (this.vocabBoard.value === '') {
        emit(' ')
      } else {
        const { teacher } = this.props
        emit(this.vocabBoard.value, teacher.username)
      }
    }, 500)
  }


  handleInput(e) {
    if (e.key === 'Enter') {
      if (this.vocabBoard.value === '') {
        emit(' ')
      } else {
        const { teacher } = this.props
        emit(this.vocabBoard.value, teacher.username)
      }
    }
  }

  handleChange(e) {
    const { target } = e
    this.setState(prevState => ({
      ...prevState,
      value: target.value,
    }))
  }

  render() {
    const { value } = this.state
    return (
      <div>
        <textarea
          className="board"
          type="text"
          value={value}
          onChange={this.handleChange}
          onKeyPress={this.handleInput}
          onKeyUp={this.handleKeyUp}
          ref={(vocabBoard) => { this.vocabBoard = vocabBoard }}
        />
      </div>
    )
  }
}

WebSocketBoard.defaultProps = {
  teacher: null,
}

WebSocketBoard.propTypes = {
  teacher: PropTypes.object,
}

export default WebSocketBoard
