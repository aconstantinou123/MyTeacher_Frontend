import React, { Component } from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as scheduleActionCreators from '../../actions/scheduleActions'

class Schedule extends Component {
  constructor() {
    super()
    // this.state = {
    //   selectedSlotDate: null,
    //   selectedSlotTime: null,
    // }
    this.renderWeek = this.renderWeek.bind(this)
    this.advanceOneWeek = this.advanceOneWeek.bind(this)
    this.goBackOneWeek = this.goBackOneWeek.bind(this)
    this.renderTime = this.renderTime.bind(this)
    this.mapSlots = this.mapSlots.bind(this)
    this.bookSlot = this.bookSlot.bind(this)
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

  mapSlots(slotHour) {
    const { currentDates } = this.props
    return currentDates.map(date => (
      <td key={date}>
        <button type="button" onClick={() => this.bookSlot(slotHour, date)}>Free Slot {slotHour}</button>
      </td>
    ))
  }

  renderWeek() {
    const { currentDates } = this.props
    return currentDates.map(date => (
      <th key={date}>{date.format('dddd Do MMM').toString()}</th>
    ))
  }

  renderTime() {
    const hours = _.range(6, 24, 1)
    return hours.map(hour => (
      <tr key={hour}>
        <td>
          {hour}
.00hr
        </td>
        {this.mapSlots(hour)}
      </tr>
    ))
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
              <table>
                <tbody>
                  <tr>
                    <th>Time</th>
                    {this.renderWeek()}
                  </tr>
                  {this.renderTime()}
                </tbody>
              </table>
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
  currentDates: null,
}

Schedule.propTypes = {
  setInitialDate: PropTypes.func.isRequired,
  initialDate: PropTypes.object,
  advanceCalenderOneWeek: PropTypes.func.isRequired,
  goBackOneCalenderWeek: PropTypes.func.isRequired,
  currentDates: PropTypes.arrayOf(PropTypes.object),
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
