import axios from "axios"
import {NotificationContainer, NotificationManager} from 'react-notifications';

import { GET_OTP, VERIFY_OTP } from "../actionTypes/LoginActionType.js"

import userLoginApi from "../utils/Api.js"

const headers = {
  "x-auth-token":"TOKEN123",
  "Content-Type" : "application/x-www-form-urlencoded"
}

const getOTP = ({countryCode, phoneNumber}) => {
  let data = {
    "otp":{"mobile_country_code":countryCode, "mobile":phoneNumber, "device_token":"tokendevice123"}
  }
  return (dispatch) => {
    axios.post("https://stap7kgv0c.execute-api.us-west-2.amazonaws.com/default/v1/customers/otp/new", data, {headers: headers}
    ).then((response) => {
      dispatch({
        type:GET_OTP,
        payload:response
      })
    }).catch(() => {
      console.log("")
    })
  }
}

const verifyOTP = ({countryCode, phoneNumber, otp}) => {
  let data = {
    "otp":{
    "mobile":phoneNumber,
    "mobile_country_code":countryCode,
    "device_token":"tokendevice123",
    "code": otp
    }
  };
  let url = "https://stap7kgv0c.execute-api.us-west-2.amazonaws.com/default/v1/customers/otp/verify";
  let method = "POST";
  let dd = JSON.stringify(data);
  let data1 = userLoginApi(headers, dd, url, method)
  debugger
  return (dispatch) => {
    dispatch({
        type:VERIFY_OTP,
        payload:data1
      })
    /*axios.post("https://stap7kgv0c.execute-api.us-west-2.amazonaws.com/default/v1/customers/otp/verify", data, {headers: headers}
    ).then((response) => {
      // debugger
      dispatch({
        type:VERIFY_OTP,
        payload:response.data
      })
    }).catch((err) => {
      alert("Please enter valid otp !")
    })*/
  }
}


export {  verifyOTP, getOTP };
