import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import promisemiddleware from "redux-promise-middleware";
import thunk from "redux-thunk"
import loginReducers from "../reducers/loginReducers.js"
// import userReducers from "../reducers/userReducers.js"

const store = combineReducers({
    users: loginReducers
});

const createStoreWithMiddleware = applyMiddleware(logger, thunk)(createStore);

export default createStoreWithMiddleware(store, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())