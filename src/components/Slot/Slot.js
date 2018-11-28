import React from 'react'
import PropTypes from 'prop-types'

const Slot = ({
  selectSlot, slotHour, date, slot,
}) => {
  const classToDisplay = slot.classType ? slot.classType : `Free Slot ${slotHour}`
  return (
    <button type="button" onClick={() => selectSlot(slotHour, date.date)}>
      {classToDisplay}
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
