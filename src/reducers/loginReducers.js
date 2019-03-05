import { GET_OTP, VERIFY_OTP } from "../actionTypes/LoginActionType.js"
import {userLoginApi, varifyOptApi} from "../utils/Api.js"


const loginReducers = (state = [], action) => {
    switch(action.type){
        case GET_OTP:
            state = userLoginApi(action.payload.countryCode, action.payload.phoneNumber)
            return {
                type: action.type,
                payload: state
            }
        case VERIFY_OTP:
            state = varifyOptApi(action.payload.countryCode, action.payload.phoneNumber, action.payload.otp)
            return {
                type: action.type,
                payload: state
            }
        default:
            return state;
    }
};

export default { loginReducers };
