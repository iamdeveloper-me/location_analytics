import React from "react";
import  {connect} from "react-redux";
import { Route } from "react-router-dom";
import Login from "../components/login/Login.js"
import Login2 from '../components/login/Login2';
import Dashboard from '../components/dashboard/Dashboard';
// import GeoLocation from '../components/geolocation/GeoLocation';
import Comparison2 from '../components/comparison2/Comparison2';

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
        <Route exact={true} path={"/login2/:code/:number"} component={Login2}></Route>
        <Route exact={true} path={"/dashboard"} component={Dashboard}></Route>
        <Route exact={true} path={"/Comparison2"} component={Comparison2}></Route>
        </div>
    );
  }
}

export default App;
