// LoginCreator.js

import { GET_OTP } from "../actionTypes/LoginActionType.js"

// import axios from "axios";

const getOTP = ({text}) => {
  return {
    type: GET_OTP,
    payload:text,
  }
}

export {getOTP };