/* eslint jsx-a11y/label-has-for: 0 */
/* eslint jsx-a11y/label-has-associated-control: 0 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import './CreateClassModal.scss'

class CreateClassModal extends Component {
  static checkForScheduleConflict(day, slotsToCheck){
    const checkSlotFree = (slotToCheck) => {
    return day.slots.reduce((acc,slot) => {
      if((`${slotToCheck}:00` === slot.hour) && (slot.classLevel !== null)){
        return (`${slotToCheck}:00` === slot.hour) && (slot.classLevel !== null)
        }
      else return acc
      }, false)
    } 
    const freeSlots = slotsToCheck.map(checkSlotFree).some(conflict => conflict === true)
    return freeSlots
  }
  constructor(props) {
    super()
    const { selectedSlot } = props
    this.state = {
      startTime: Number(selectedSlot.hour.split(':')[0]),
      endTime: Number(selectedSlot.hour.split(':')[0]) + 1,
      classLevel: 'BEGINNER',
      classType: 'GROUP',
      classDescription: '',
      capacity: 1,
      displayWarning: false,
      warningMessage: '',
    }
    this.handleClassTypeChange = this.handleClassTypeChange.bind(this)
    this.handleClassLevelChange = this.handleClassLevelChange.bind(this)
    this.handleClassCapacityChange = this.handleClassCapacityChange.bind(this)
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.generateTimeSlots = this.generateTimeSlots.bind(this)
    this.handleStartTimeChange = this.handleStartTimeChange.bind(this)
    this.handleEndTimeChange = this.handleEndTimeChange.bind(this)
  }

  generateTimeSlots = () => {
    const numberOfSlots = _.range(6, 24, 1)
    return numberOfSlots.map(slotTime => (
      <option key={slotTime} value={slotTime}>
        {slotTime}
:00
      </option>
    ))
  }

  handleClassTypeChange(event) {
    const { target } = event
    this.setState(prevState => ({
      ...prevState,
      classType: target.value,
    }))
  }

  handleClassLevelChange(event) {
    const { target } = event
    this.setState(prevState => ({
      ...prevState,
      classLevel: target.value,
    }))
  }

  handleClassCapacityChange(event) {
    const { target } = event
    this.setState(prevState => ({
      ...prevState,
      capacity: Number(target.value),
    }))
  }

  handleDescriptionChange(event) {
    const { target } = event
    this.setState(prevState => ({
      ...prevState,
      classDescription: target.value,
    }))
  }

  handleSubmit(event) {
    event.preventDefault()
    const { selectedSlot, schedule } = this.props
    const { startTime, endTime } = this.state
    const hoursToCheck = _.range(startTime, endTime, 1)
    const dayToCheck = schedule.find(day => day.date === selectedSlot.date)
    const scheduleConflict = CreateClassModal.checkForScheduleConflict(dayToCheck, hoursToCheck)
    if(!scheduleConflict) {
      if (endTime - startTime <= 0) {
        this.setState(prevState => ({
          ...prevState,
          displayWarning: true,
          warningMessage: 'Invalid Lesson length'
        }))
      } else {
        this.setState(prevState => ({
          ...prevState,
          displayWarning: false,
        }))
        const { allocateSlotClicked } = this.props
        allocateSlotClicked(this.state)
      }
      }
    else {
      this.setState(prevState => ({
        ...prevState,
        displayWarning: true,
        warningMessage: 'Schedule Conflict'
      }))
    }
  }

  handleStartTimeChange(event) {
    this.setState(prevState => ({
      ...prevState,
      displayWarning: false,
      warningMessage: '',
    }))  
    const { target } = event
    this.setState(prevState => ({
      ...prevState,
      startTime: target.value,
    }))
  }

  handleEndTimeChange(event) {
    this.setState(prevState => ({
      ...prevState,
      displayWarning: false,
      warningMessage: '',
    }))  
    const { target } = event
    this.setState(prevState => ({
      ...prevState,
      endTime: target.value,
    }))
  }

  render() {
    const { closeModal } = this.props
    const { startTime, displayWarning, warningMessage } = this.state
    return (
      <div className="modal-popup">
        <div className="modal-content">
          <h2 className="title">Create Class</h2>
          <label htmlFor="start-time">
          Choose the start time:
            <select id="start-time" defaultValue={startTime} onChange={this.handleStartTimeChange}>
              {this.generateTimeSlots()}
            </select>
          </label>
          <br />
          <label htmlFor="end-time">
          Choose the end time:
            <select id="end-time" defaultValue={(startTime + 1).toString()} onChange={this.handleEndTimeChange}>
              {this.generateTimeSlots()}
            </select>
          </label>
          <br />
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="select-type">
          Choose the type of class:
              <select id="select-type" defaultValue="GROUP" onChange={this.handleClassTypeChange}>
                <option value="GROUP">Group</option>
                <option value="ONE_ON_ONE">One on one</option>
              </select>
            </label>
            <br />
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
            <br />
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
            <br />
            <label htmlFor="capacity">
          Class description:
              <textarea id="capacity" placeholder="Enter a description for the class" onChange={this.handleDescriptionChange} />
            </label>
            {
              displayWarning
              && <p>{warningMessage}</p>
            }
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

CreateClassModal.defaultProps = {
  selectedSlot: null,
}

CreateClassModal.propTypes = {
  schedule: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedSlot: PropTypes.object,
  allocateSlotClicked: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
}

export default CreateClassModal
