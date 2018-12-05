import React from 'react'
import PropTypes from 'prop-types'

import './Slot.scss'

const Slot = ({
  selectSlot, slotHour, date, slot,
}) => {
  const hour = Number(slot.hour.split(':')[0])
  const startTime = slot.startTime ? Number(slot.startTime.split(':')[0]) : null
  const displayClassLevel = () => {
    switch (slot.classLevel) {
      case 'ADVANCED':
        return 'Advanced'
      case 'UPPER_INT':
        return 'Upper-Intermediate'
      case 'INT':
        return 'Intermediate'
      case 'PRE_INT':
        return 'Pre-Intermediate'
      case 'ELEMENTARY':
        return 'Elementary'
      case 'BEGINNER':
        return 'Beginner'
      case 'NONE_SPECIFIED':
        return 'None specified'
      default:
        return ''
    }
  }

  const displayClassType = () => {
    switch (slot.classType) {
      case 'OPEN_SLOT':
        return 'Open slot'
      case 'ONE_ON_ONE':
        return 'One on One'
      case 'GROUP':
        return 'Group'
      default:
        return `Free Slot ${slotHour}`
    }
  }
  const chooseTextToDisplay = () => {
    if (startTime && startTime === hour) {
      return displayClassType()
    }
    if (startTime && (hour - startTime) === 1) {
      return displayClassLevel()
    }
    if (startTime && (hour - startTime) === 2) {
      return `${slot.startTime} - ${slot.endTime}`
    }
    if (startTime && (hour - startTime) === 3) {
      return `No. of students: ${slot.students.length ? slot.students.length : 0}`
    }
    if (startTime) {
      return ''
    }

    return `Free Slot ${slotHour}`
  }

  const displayClassCSS = () => {
    switch (slot.classType) {
      case 'OPEN_SLOT':
        return 'slot-button open'
      case 'ONE_ON_ONE':
        return 'slot-button one'
      case 'GROUP':
        return 'slot-button group'
      default:
        return 'slot-button'
    }
  }
  return (
    <button className={displayClassCSS()} type="button" onClick={() => selectSlot(slotHour, date.date)}>
      {chooseTextToDisplay()}
    </button>
  )
}

Slot.propTypes = {
  slot: PropTypes.object.isRequired,
  selectSlot: PropTypes.func.isRequired,
  slotHour: PropTypes.string.isRequired,
  date: PropTypes.object.isRequired,
}

export default Slot
