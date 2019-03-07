import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import promisemiddleware from "redux-promise-middleware";
import thunk from "redux-thunk"
import loginReducers from "../reducers/loginReducers.js"
// import userReducers from "../reducers/userReducers.js"


const createStoreWithMiddleware = applyMiddleware(promisemiddleware(), logger)(createStore)

const store = combineReducers({
    users: loginReducers
});

export default createStore(store, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())