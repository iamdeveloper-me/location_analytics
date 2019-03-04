import { GET_ADDRESS } from "../actionTypes/GeoLocationActionType.js";
import { CREATE_MAP } from "../actionTypes/GeoLocationActionType.js";
import { ADD_POLYGON_TO_MAP } from "../actionTypes/GeoLocationActionType.js";

const getAddress = ({text}) => {
  return {
    type: GET_ADDRESS,
    payload:text,
  }
}

const createMap = ({text}) => {
  return {
    type: CREATE_MAP,
    payload:text,
  }
}

const addPolygonToMap = ({text}) => {
  return {
    type: ADD_POLYGON_TO_MAP,
    payload:text,
  }
}

export { getAddress, createMap, addPolygonToMap };