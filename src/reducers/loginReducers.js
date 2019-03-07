import { GET_OTP, VERIFY_OTP } from "../actionTypes/LoginActionType.js"
import {userLoginApi, varifyOptApi} from "../utils/Api.js"


const initialState = {
  users: []
}
const loginReducers = (state = [], action) => {
    // debugger
    switch(action.type){
        case GET_OTP:
            return Object.assign({}, state, action.payload)

        case VERIFY_OTP:
            // debugger
            return Object.assign({}, state, action.payload)

        default:
            return state;
        }
};

export default loginReducers;

