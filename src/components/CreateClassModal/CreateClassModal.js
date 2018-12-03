/* eslint jsx-a11y/label-has-for: 0 */
/* eslint jsx-a11y/label-has-associated-control: 0 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './CreateClassModal.scss'

class CreateClassModal extends Component {
  constructor(){
    super()
    this.state = { 
      classLevel: "BEGINNER",
      classType: "GROUP",
      classDescription: "",
      capacity: 1,
     }
     this.handleClassTypeChange = this.handleClassTypeChange.bind(this)
     this.handleClassLevelChange = this.handleClassLevelChange.bind(this)
     this.handleClassCapacityChange = this.handleClassCapacityChange.bind(this)
     this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
     this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleClassTypeChange(event){
    const { target } = event
    this.setState(prevState => ({
      ...prevState,
      classType: target.value
    }))
  }

  handleClassLevelChange(event){
    const { target } = event
    this.setState(prevState => ({
      ...prevState,
      classLevel
      : target.value
    }))
  }

  handleClassCapacityChange(event){
    const { target } = event
    this.setState(prevState => ({
      ...prevState,
      capacity: Number(target.value)
    }))
  }

  handleDescriptionChange(event){
    const { target } = event
    this.setState(prevState => ({
      ...prevState,
      classDescription
      : target.value
    }))
  }

  handleSubmit(event){
    event.preventDefault()
    const { allocateSlotClicked } = this.props
    allocateSlotClicked(this.state)
  }

  render(){
    const { closeModal } = this.props
    return (
    <div className="modal-popup">
      <div className="modal-content">
        <h2 className="title">Create Class</h2>
        <form onSubmit={this.handleSubmit}>
        <label htmlFor="select-type">
          Choose the type of class:
          <select id="select-type" defaultValue="GROUP" onChange={this.handleClassTypeChange}>
            <option value="GROUP">Group</option>
            <option value="ONE_ON_ONE">One on one</option>
          </select>
          </label>
          <br/>
          <label htmlFor="select-level">
            Choose the level of the class:
            <select id="select-level" defaultValue="BEGINNER" onChange={this.handleClassLevelChange}>
              <option value="BEGINNER">Beginner</option>
              <option value="ELEMENTARY">Elementary</option>
              <option value="PRE_INT">Pre-Intermediate</option>
              <option value="INT">Intermediate</option>
              <option value="UPPER_INT">Upper-Intermediate</option>
              <option value="ADVANCED">Advanced</option>
            </select>
          </label>
          <br/>
          <label htmlFor="select-capacity">
            Choose class capacity:
            <select id="select-capacity" defaultValue="1" onChange={this.handleClassCapacityChange}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
            </select>
          </label>
          <br/>
          <label htmlFor="capacity">
          Class description:
            <textarea id="capacity" placeholder="Enter a description for the class" onChange={this.handleDescriptionChange} />
          </label>
          <div className="buttons-container">
            <button type="submit">Allocate Slot</button>
            <button type="button" onClick={() => closeModal()}>Back</button>
          </div>
        </form>
      </div>
    </div>
    )
  }
}

CreateClassModal.propTypes = {
  allocateSlotClicked: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
}

export default CreateClassModal
