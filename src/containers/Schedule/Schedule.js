import React, { Component } from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Slot from '../../components/Slot/Slot'
import CreateClassModal from '../../components/CreateClassModal/CreateClassModal'
import * as scheduleActionCreators from '../../actions/scheduleActions'
import { generateId } from '../../helperFunctions/generateIDFunction'

import './Schedule.scss'

class Schedule extends Component {
  static generateDataStyling(slot) {
    switch (slot.classType) {
      case 'OPEN_SLOT':
        return 'open'
      case 'ONE_ON_ONE':
        return 'one'
      case 'GROUP':
        return 'group'
      default:
        return ''
    }
  }

  constructor() {
    super()
    this.state = { createClassModalClicked: false }
    this.advanceOneWeek = this.advanceOneWeek.bind(this)
    this.goBackOneWeek = this.goBackOneWeek.bind(this)
    this.selectSlot = this.selectSlot.bind(this)
    this.renderSchedule = this.renderSchedule.bind(this)
    this.renderRow = this.renderRow.bind(this)
    this.createClassClicked = this.createClassClicked.bind(this)
    this.allocateSlotClicked = this.allocateSlotClicked.bind(this)
    this.deleteClassFromSchedule = this.deleteClassFromSchedule.bind(this)
  }

  componentWillMount() {
    const {
      teacher,
      getSchedule,
      setInitialDate,
    } = this.props
    setInitialDate()
    if (teacher) {
      getSchedule(teacher.username)
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      teacher,
      getSchedule,
    } = this.props
    const teacherReady = (teacher !== nextProps.teacher
    && nextProps.teacher.username !== null)
    if (teacherReady) {
      getSchedule(nextProps.teacher.username)
    }
  }

  createClassClicked() {
    this.setState(prevState => ({
      ...prevState,
      createClassModalClicked: !prevState.createClassModalClicked,
    }))
  }

  advanceOneWeek() {
    const {
      advanceCalenderOneWeek,
      schedule,
      slotsRetrievedFromDB,
    } = this.props
    advanceCalenderOneWeek(schedule, slotsRetrievedFromDB)
  }

  goBackOneWeek() {
    const {
      goBackOneCalenderWeek,
      schedule,
      slotsRetrievedFromDB,
    } = this.props
    goBackOneCalenderWeek(schedule, slotsRetrievedFromDB)
  }

  selectSlot(slotHour, date) {
    const { selectSlot } = this.props
    this.createClassClicked()
    selectSlot(date, slotHour)
  }

  allocateSlotClicked(newClass) {
    const {
      selectedSlot,
      teacher,
      allocateSlot,
      updateClass,
      schedule,
    } = this.props
    const classId = newClass.classId !== 'none' ? newClass.classId : generateId()
    const numberOfSlots = _.range(newClass.startTime, newClass.endTime, 1)
    const slotsToAllocate = numberOfSlots.map(hour => ({
      ...selectedSlot,
      hour: `${hour}:00`,
      ...newClass,
      startTime: `${newClass.startTime}:00`,
      endTime: `${newClass.endTime}:00`,
      username: teacher.username,
      classId,
      students: newClass.students || [],
    }))
    if (newClass.classId === 'none') {
      allocateSlot(slotsToAllocate, schedule)
    } else {
      updateClass(slotsToAllocate, schedule)
    }
    this.createClassClicked()
  }

  deleteClassFromSchedule(classId) {
    const { deleteClass, teacher } = this.props
    deleteClass(teacher.username, classId)
    this.createClassClicked()
  }

  renderRow(slotIndex) {
    const { schedule } = this.props
    return schedule.map((date, index) => {
      const slot = schedule[index].slots[slotIndex]
      return (
        <td className={Schedule.generateDataStyling(slot)} key={date.date}>
          <Slot
            slotHour={slot.hour}
            slot={slot}
            date={date}
            selectSlot={this.selectSlot}
          />
        </td>
      )
    })
  }

  renderSchedule() {
    const { schedule } = this.props
    const mappedHeaders = schedule.map(date => <th key={date.date}>{date.date}</th>)
    const numberOfSlots = _.range(0, 18, 1)
    const mappedBody = numberOfSlots.map(number => (
      <tbody key={number}>
        <tr>
          <td>
            {number + 6}
:00
          </td>
          {this.renderRow(number)}
        </tr>
      </tbody>
    ))
    return (
      <table cellSpacing="0">
        <thead>
          <tr>
            <th>Time</th>
            {mappedHeaders}
          </tr>
        </thead>
        {mappedBody}
      </table>
    )
  }

  render() {
    const {
      fetchedSchedule,
      fetchingSchedule,
      selectedSlot,
      schedule,
    } = this.props
    const { createClassModalClicked } = this.state
    return (
      <div>
        <h2>My Schedule</h2>
        {
            fetchedSchedule
            && (
            <div>
                {this.renderSchedule()}
              <button type="button" onClick={this.goBackOneWeek}>Previous Week</button>
              <button type="button" onClick={this.advanceOneWeek}>Next Week</button>
            </div>
            )
        }
        {
          fetchingSchedule
          && <div>Loading...</div>
        }
        {
            createClassModalClicked
            && (
            <CreateClassModal
              deleteClassFromSchedule={this.deleteClassFromSchedule}
              schedule={schedule}
              selectedSlot={selectedSlot}
              allocateSlotClicked={this.allocateSlotClicked}
              closeModal={this.createClassClicked}
            />
            )
          }
      </div>

    )
  }
}

Schedule.defaultProps = {
  schedule: null,
  selectedSlot: null,
  teacher: null,
  slotsRetrievedFromDB: null,
}

Schedule.propTypes = {
  deleteClass: PropTypes.func.isRequired,
  updateClass: PropTypes.func.isRequired,
  slotsRetrievedFromDB: PropTypes.arrayOf(PropTypes.object),
  fetchingSchedule: PropTypes.bool.isRequired,
  fetchedSchedule: PropTypes.bool.isRequired,
  teacher: PropTypes.object,
  getSchedule: PropTypes.func.isRequired,
  selectedSlot: PropTypes.object,
  setInitialDate: PropTypes.func.isRequired,
  advanceCalenderOneWeek: PropTypes.func.isRequired,
  goBackOneCalenderWeek: PropTypes.func.isRequired,
  schedule: PropTypes.arrayOf(PropTypes.object),
  selectSlot: PropTypes.func.isRequired,
  allocateSlot: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    ...state.schedule,
    ...state.teacher,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...scheduleActionCreators,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Schedule)
