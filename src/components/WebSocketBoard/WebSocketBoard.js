import React, { Component } from 'react'
import { emit } from '../../store/websocketsInit'

class  WebSocketBoard extends Component {
  constructor(){
    super()
    this.state = { value: '' }
    this.handleInput = this.handleInput.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleInput(e){
   if(e.key === 'Enter'){
     if(this.vocabBoard.value === ''){
      emit(' ')
     }
     else {
       emit(this.vocabBoard.value)
     }
   }
  }

  handleChange(e){
    const { target } = e
    this.setState(prevState => ({ 
      ...prevState, 
      value: target.value
    }))
  }

  render(){
    const { value } = this.state
    return (
      <div>
        <input 
        type="text" 
        value={value}
        onChange={this.handleChange}
        onKeyPress={this.handleInput}
        ref={(vocabBoard) => { this.vocabBoard = vocabBoard }}
        />
      </div>
    )
  }
}

export default WebSocketBoard