import React, { Component } from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as scheduleActionCreators from '../../actions/scheduleActions'

class Schedule extends Component {
  constructor(){
    super()
    this.renderWeek = this.renderWeek.bind(this)
    this.advanceOneWeek = this.advanceOneWeek.bind(this)
    this.goBackOneWeek = this.goBackOneWeek.bind(this)
  }

  componentWillMount(){
    const { setInitialDate } = this.props
    setInitialDate()
  }

  advanceOneWeek(){
    const { advanceCalenderOneWeek } = this.props
    advanceCalenderOneWeek()
  }

  goBackOneWeek(){
    const { goBackOneCalenderWeek } = this.props
    goBackOneCalenderWeek()
  }

  renderWeek(){
    const { initialDate } = this.props
    const daysOfTheWeek = _.range(0, 7, 1)
    return daysOfTheWeek.map((day) => {
      const newDay = initialDate.clone()
      return <th key={day}>{newDay.add(day, 'day').format('dddd Do MMM').toString()}</th> 
    })
  }


  render(){
    const { initialDate } = this.props
    return (
        <div>
          <h2>My Schedule</h2>
          {
            initialDate &&
            <div>
              <table>
                <tbody>
                  <tr>
                    {this.renderWeek()}
                  </tr>
                </tbody>
              </table>
            <button type='button' onClick={this.goBackOneWeek}>Previous Week</button>
            <button type='button' onClick={this.advanceOneWeek}>Next Week</button>
            </div>
          }
        </div>

      )
    }
  }

  Schedule.defaultProps = {
    initialDate: null
  }

  Schedule.propTypes = {
    setInitialDate: PropTypes.func.isRequired,
    initialDate: PropTypes.object,
    advanceCalenderOneWeek: PropTypes.func.isRequired,
    goBackOneCalenderWeek: PropTypes.func.isRequired,
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