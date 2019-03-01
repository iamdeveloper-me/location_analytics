import { GET_OTP } from "../actionTypes/LoginActionType.js"

const loginReducers = (state = [], action) => {
    switch(action.type){
        case GET_OTP:
        console.log(">>>>>@@@@@@@@@@@@@@>>>>>> ",action)
            return [
                ...state,
                action.payload
            ]
        default:
            return state;
    }
};

export default loginReducers;
