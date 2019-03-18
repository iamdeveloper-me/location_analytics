import React from "react";
import  {connect} from "react-redux";
import {Route, Redirect} from 'react-router-dom'; 
import Login from "../components/login/Login.jsx"
import Login2 from '../components/login/Login2';
import Dashboard from '../components/dashboard/Dashboard';
// import GeoLocation from '../components/geolocation/GeoLocation';
import Comparison2 from '../components/comparison2/Comparison2';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
    localStorage.getItem("isAuthenticated") === "true"
        ? <Component {...props} />
        : <Redirect to='/login' />
    )} />
)

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
        <Route exact={true} path={"/login2"} component={Login2}></Route>
        <PrivateRoute exact={true} path={"/dashboard"} component={Dashboard}></PrivateRoute>
        <Route exact={true} path={"/Comparison2"} component={Comparison2}></Route>
        </div>
    );
  }
}

export default App;
