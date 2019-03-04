import { GET_LOCATION_DATA } from "../actionTypes/Comparison2ActionType.js";
import { SHOW_FULL_MAP } from "../actionTypes/Comparison2ActionType.js";
import { HANDLE_MAP_VIEW } from "../actionTypes/Comparison2ActionType.js";
import { HANDLE_CARD_VIEW } from "../actionTypes/Comparison2ActionType.js";
import { GET_LOCATION } from "../actionTypes/Comparison2ActionType.js";
import { GET_ADDRESS } from "../actionTypes/Comparison2ActionType.js";
import { SHOW_HEADER } from "../actionTypes/Comparison2ActionType.js";
import { HIDE_HEADER } from "../actionTypes/Comparison2ActionType.js";

const getLocation = ({text}) => {
  return {
    type: GET_LOCATION,
    payload: text,
  }
}

const getAddress = ({text}) => {
  return {
    type: GET_ADDRESS,
    payload: text,
  }
}

const showHeader = ({text}) => {
  return {
    type: SHOW_HEADER,
    payload: text,
  }
}

const hideHeader = ({text}) => {
  return {
    type: HIDE_HEADER,
    payload: text,
  }
}

export { getLocation, getAddress, showHeader, hideHeader };