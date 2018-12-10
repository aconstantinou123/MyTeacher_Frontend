import moment from 'moment'

export const advanceSevenDays = stringDate => moment(stringDate, 'dddd Do MMM YYYY').clone().add(7, 'days').format('dddd Do MMM YYYY')

export const goBackSevenDays = stringDate => moment(stringDate, 'dddd Do MMM YYYY').clone().subtract(7, 'days').format('dddd Do MMM YYYY')

export const convertToDisplayFormat = slot => ({
    ...slot,
    date: moment(slot.date, 'DD-MM-YYYY').format('dddd Do MMM YYYY')
})

export const convertToDBFormat = slot =>  ({
    ...slot,
    date: moment(slot.date, 'dddd Do MMM YYYY').format('DD-MM-YYYY')
})

