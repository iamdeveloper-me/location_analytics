// LoginCreator.js

import { GET_OTP, VERIFY_OTP } from "../actionTypes/LoginActionType.js"
// import axios from "axios";

const getOTP = ({countryCode, phoneNumber}) => {
    // debugger
  return {
    type: GET_OTP,
    payload:{
        countryCode:countryCode,
        phoneNumber:phoneNumber
    },
  }
}
const verifyOTP = ({countryCode, phoneNumber, otp}) => {
    // debugger
  return {
    type: VERIFY_OTP,
    payload:{
        countryCode:countryCode,
        phoneNumber:phoneNumber,
        otp:otp
    },
  }
}

const verifyOTP = ({text}) => {
  return {
    type: VERIFY_OTP,
    payload:text,
  }
}

export { getOTP, verifyOTP };
