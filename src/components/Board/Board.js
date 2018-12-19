import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { emit } from '../../store/websocketsInit'

import './Board.scss'

class Board extends Component {
  constructor() {
    super()
    this.state = {
      x: null,
      y: null,
      ctx: null,
    }
    this.getMousePostionCanvas = this.getMousePostionCanvas.bind(this)
    this.writeText = this.writeText.bind(this)
    this.sendMessage = this.sendMessage.bind(this)
    this.renderBoard = this.renderBoard.bind(this)
  }

  componentDidMount() {
    this.setState(prevState => ({
      ...prevState,
      ctx: this.canvas.getContext('2d'),
    }))
    const ctx = this.canvas.getContext('2d')
    ctx.fillStyle = '#FFFF'
    ctx.fillRect(0, 0, 640, 425)
  }

  getMousePostionCanvas(e) {
    const { screenX, target, pageY } = e
    this.setState(prevState => ({
      ...prevState,
      x: screenX,
      y: pageY - target.offsetTop,
    }))
  }

  writeText(e) {
    const { ctx, x, y } = this.state
    if (e.key === 'Enter') {
      this.setState(prevState => ({
        ...prevState,
        y: prevState.y + 25,
      }))
    } else if (e.key === 'Backspace') {
      this.setState(prevState => ({
        ...prevState,
        x: prevState.x - 25,
      }))
      ctx.fillStyle = '#FFFF'
      ctx.fillRect(x - 25, y - 30, 30, 40)
    } else {
      ctx.font = '40px Courier'
      ctx.fillStyle = '#000000'
      ctx.fillText(e.key, x, y)
      this.setState(prevState => ({
        ...prevState,
        x: prevState.x + 25,
      }))
    }
  }

  sendMessage() {
    // const { ctx } = this.state
    // const imgdata = ctx.getImageData(0,0, 640, 425).data
    // console.log(imgdata)
    const canvasData = this.canvas.toDataURL('image/jpeg', 0.1)
    emit(canvasData)
  }

  renderBoard() {
    return (
      <div>
        <canvas
          tabIndex="0"
          className="canvas"
          ref={(canvas) => { this.canvas = canvas }}
          width={640}
          height={425}
          onClick={this.getMousePostionCanvas}
          onKeyDown={this.writeText}
        />
        <button type="button" onClick={this.sendMessage}>Send Message</button>
      </div>
    )
  }

  render() {
    const { dataReceived } = this.props
    return (
      <div>
        {this.renderBoard()}
        <img src={dataReceived} alt="board" />
      </div>
    )
  }
}

Board.defaultProps = {
  dataReceived: null,
}

Board.propTypes = {
  dataReceived: PropTypes.string,
}

export default Board
