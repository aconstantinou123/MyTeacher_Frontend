
const mapSlotsReduce = (slotsFound, slotToCheck) => {
  const returnedSlot = slotsFound.reduce((acc, slot) => {
    if (slotToCheck.hour === slot.hour
      && slotToCheck.date === slot.date) {
      return slot
    }
    return acc
  }, slotToCheck)
  return returnedSlot
}

  
export const updateSchedule = (schedule, slotsRetrieved) => {
    return schedule
      .map(date => ({
      ...date,
      slots: date.slots.map(slot => mapSlotsReduce(slotsRetrieved, slot)),
  }))
}