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
    const { setInitialDate } = this.props
    setInitialDate()
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
    const dateToFind = selectedSlot.date.format('dddd Do MMM')
    const updatedSchedule = schedule.map((date) => {
      if (dateToFind === date.date.format('dddd Do MMM')) {
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
    allocateSlot(updatedSchedule)
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
    const mappedHeaders = schedule.map(date => <th key={date.date.format('dddd Do MMM')}>{date.date.format('dddd Do MMM').toString()}</th>)
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
}

Schedule.propTypes = {
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
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...scheduleActionCreators,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Schedule)
