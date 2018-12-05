
const mapSlotsReduce = (slotsFound, slotToCheck) => {
  const returnedSlot = slotsFound.reduce((acc, slot) => {
    if (slotToCheck.hour === slot.hour
      && slotToCheck.date === slot.date) {
      return slot
    }
    return acc
  }, { 
    ...slotToCheck,
    classType: null,
    username: null,
    classId: null,
    classLevel: null,
    classDescription: null,
    capacity: null,
    students: null,
    startTime: null,
    endTime: null,
   })
  return returnedSlot
}


export const updateSchedule = (schedule, slotsRetrieved) => schedule
  .map(date => ({
    ...date,
    slots: date.slots.map(slot => mapSlotsReduce(slotsRetrieved, slot)),
  }))
