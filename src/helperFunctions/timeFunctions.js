import moment from 'moment'

export const advanceSevenDays = (stringDate) => {
  return moment(stringDate, 'dddd Do MMM YYYY').clone().add(7, 'days').format('dddd Do MMM YYYY')
}

export const goBackSevenDays = (stringDate) => {
  return moment(stringDate, 'dddd Do MMM YYYY').clone().subtract(7, 'days').format('dddd Do MMM YYYY')
}