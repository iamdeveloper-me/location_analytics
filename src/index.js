import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from './container/App';

import './index.css';
import "./static/css/custom.css";
import "./static/css/style.min.css";

import store from "./store/index.js";

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>    
            <App/>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));

