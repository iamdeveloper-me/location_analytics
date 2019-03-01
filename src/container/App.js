import React from "react";
import  {connect} from "react-redux";
import { Route } from "react-router-dom";

// import { getOpt } from "../actions/LoginCreator.js";
import Login from "../components/login/Login.js"

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    };
    render(){
        
        return(
            <div>
                <Route exact={true} path={"/"} component={Login} ></Route>
                <Route exact={true} path={"/login"} component={Login}></Route>
            </div>
        );
    }
}

export default App;
