import React, { Component } from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Slot from '../../components/Slot/Slot'
import CreateClassModal from '../../components/CreateClassModal/CreateClassModal'
import * as scheduleActionCreators from '../../actions/scheduleActions'

class Schedule extends Component {
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
    const { advanceCalenderOneWeek } = this.props
    advanceCalenderOneWeek()
  }

  goBackOneWeek() {
    const { goBackOneCalenderWeek } = this.props
    goBackOneCalenderWeek()
  }

  selectSlot(slotHour, date) {
    const { selectSlot } = this.props
    this.createClassClicked()
    selectSlot(date, slotHour)
  }

  allocateSlotClicked(classType) {
    const { selectedSlot, schedule } = this.props
    console.log(classType)
    const dateToFind = selectedSlot.date
    const updatedSchedule = schedule.map((date) => {
      if (dateToFind === date.date) {
        return {
          ...date,
          slots: date.slots.map((slot) => {
            if (selectedSlot.hour === slot.timeOfSlot) {
              return {
                ...slot,
                classType,
              }
            } return slot
          }),
        }
      } return date
    })
    const { allocateSlot } = this.props
    allocateSlot(updatedSchedule, selectedSlot)
    this.createClassClicked()
  }

  renderRow(slotIndex) {
    const { schedule } = this.props
    return schedule.map((date, index) => {
      const slotHour = schedule[index].slots[slotIndex].timeOfSlot
      return (
        <td key={date.date}>
          <Slot
            slotHour={slotHour}
            slot={schedule[index].slots[slotIndex]}
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
      <table>
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
    const { initialDate } = this.props
    const { createClassModalClicked } = this.state
    return (
      <div>
        <h2>My Schedule</h2>
        {
            initialDate
            && (
            <div>
                {this.renderSchedule()}
              <button type="button" onClick={this.goBackOneWeek}>Previous Week</button>
              <button type="button" onClick={this.advanceOneWeek}>Next Week</button>
            </div>
            )
          }
        {
            createClassModalClicked
            && (
            <CreateClassModal
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
  initialDate: null,
  schedule: null,
  selectedSlot: null,
  teacher: null,
}

Schedule.propTypes = {
  teacher: PropTypes.object,
  getSchedule: PropTypes.func.isRequired,
  selectedSlot: PropTypes.object,
  setInitialDate: PropTypes.func.isRequired,
  initialDate: PropTypes.string,
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
