import axios from 'axios'

import {
  GENERATE_TOKEN
} from '../types/types'

export const generateTokenPending = () => ({type: `${GENERATE_TOKEN}_PENDING`})
export const generateTokenFulfilled = payload => ({
  type: `${GENERATE_TOKEN}_FULFILLED`,
  payload,
})
export const generateTokenRejected = (err) => ({
  type: `${GENERATE_TOKEN}_REJECTED`,
  payload: err.message
})

export const generateToken = () => async (dispatch) => {
  dispatch(generateTokenPending())
  try {
    const response = await axios.get(process.env.TWILIO_URL)
    dispatch(generateTokenFulfilled(response.data))
  }
  catch(err){
    dispatch(generateTokenRejected(err))
  }
}