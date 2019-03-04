// LoginCreator.js

import { GET_OTP } from "../actionTypes/LoginActionType.js"
import { VERIFY_OTP } from "../actionTypes/LoginActionType.js"
// import axios from "axios";

const getOTP = ({text}) => {
  return {
    type: GET_OTP,
    payload:text,
  }
}

const verifyOTP = ({text}) => {
  return {
    type: VERIFY_OTP,
    payload:text,
  }
}

export { getOTP, verifyOTP };