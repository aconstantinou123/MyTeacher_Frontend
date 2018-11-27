import React, { Component } from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as scheduleActionCreators from '../../actions/scheduleActions'

class Schedule extends Component {
  constructor() {
    super()
    this.advanceOneWeek = this.advanceOneWeek.bind(this)
    this.goBackOneWeek = this.goBackOneWeek.bind(this)
    this.bookSlot = this.bookSlot.bind(this)
    this.renderSchedule = this.renderSchedule.bind(this)
    this.renderRow = this.renderRow.bind(this)
  }

  componentWillMount() {
    const { setInitialDate } = this.props
    setInitialDate()
  }

  advanceOneWeek() {
    const { advanceCalenderOneWeek } = this.props
    advanceCalenderOneWeek()
  }

  goBackOneWeek() {
    const { goBackOneCalenderWeek } = this.props
    goBackOneCalenderWeek()
  }

  bookSlot(slotHour, date) {
    const { selectSlot } = this.props
    selectSlot(date, slotHour)
  }

  renderRow(slotIndex) {
    const { schedule } = this.props
    return schedule.map((date, index) => {
      const slotHour = schedule[index].slots[slotIndex].timeOfSlot
      return (
        <td key={date.date}>
          <button type="button" onClick={() => this.bookSlot(slotHour, date.date)}>
Free Slot
            {' '}
            {' '}
            {slotHour}
          </button>
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
      </div>

    )
  }
}

Schedule.defaultProps = {
  initialDate: null,
  schedule: null,
}

Schedule.propTypes = {
  setInitialDate: PropTypes.func.isRequired,
  initialDate: PropTypes.object,
  advanceCalenderOneWeek: PropTypes.func.isRequired,
  goBackOneCalenderWeek: PropTypes.func.isRequired,
  schedule: PropTypes.arrayOf(PropTypes.object),
  selectSlot: PropTypes.func.isRequired,
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
