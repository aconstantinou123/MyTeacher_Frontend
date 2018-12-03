import React from 'react'
import PropTypes from 'prop-types'

import './Slot.scss'

const Slot = ({
  selectSlot, slotHour, date, slot,
}) => {
  const displayClassType = () => {
    switch(slot.classType){
      case 'ONE_ON_ONE':
        return 'One on One'
      case 'GROUP':
        return 'Group'
      default:
        return `Free Slot ${slotHour}`
    }
  }
  const displayClassCSS = () => {
    switch(slot.classType){
      case 'ONE_ON_ONE':
        return "slot-button one"
      case 'GROUP':
        return "slot-button group"
      default:
        return "slot-button"
    }
  }
  return (
    <button className={displayClassCSS()} type="button" onClick={() => selectSlot(slotHour, date.date)}>
      {displayClassType()}
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
