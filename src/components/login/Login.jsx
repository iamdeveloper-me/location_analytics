import React from "react";

import { connect } from "react-redux"
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

import { getOTP } from "../../actions/LoginCreator.js"


class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            countryCode: window.countrycode,
            phoneNumber: "",
            userLogin: [],
            statusText:"",
            rememberMe:false
        }
    }

    handlePhoneNumber = (e) => {
      const re = /^[0-9\b]+$/;
      if(e.target.value === '' || re.test(e.target.value)){
          this.setState({
            phoneNumber: e.target.value
          });
      }
    }
    componentDidMount(){
        // let rem = localStorage.getItem("isAuthenticated");
        let rem = localStorage.getItem("mobile");
        if (rem) {
            this.props.history.push("/dashboard/");
        }
    }

    createNotification(type, mes) {
        if (type == "success") {
            NotificationManager.success(mes);
        }else if (type == "warning") {
            NotificationManager.warning(mes);
        }else if (type == "error") {
            NotificationManager.error(mes);
        }
    };

    handleSendCode = (e) => {
      e.preventDefault();
      if(this.state.countryCode!=="" && this.state.phoneNumber !==""){
          //call api service to send otp and mov to next screen to enter otp
        let rem = localStorage.getItem("mobile");
        if (this.state.phoneNumber == rem) {
            this.props.history.push("/dashboard/");
        }else{
          this.props.getOTP({
            countryCode:this.state.countryCode,
            phoneNumber:this.state.phoneNumber
          })
        }
      }
      else{
          this.createNotification('warning', 'Country Code and Phone Number both should be required.')
      }
    }

    componentWillReceiveProps(nextProps){
        let countryCode = this.state.countryCode
        let phoneNumber = this.state.phoneNumber
        let status = nextProps.userLogin.status
        var props = this.props;
        if (status == 200) {
          localStorage.setItem("send_otp_num", phoneNumber);
          localStorage.setItem("send_otp_", countryCode);
          props.history.push("/login2");
          this.createNotification('success', 'OTP sent successfully', 2000)
        }else{
          this.createNotification('success', 'Somethig went wrong')
        }
    }

    render(){
        console.log(this.props)
        return(
            <section className="login-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 logo-col">
                            <img src={process.env.PUBLIC_URL + '/images/logo.svg'} alt="Logo" />
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 login-col">
                            <div className="login-div">
                                <form onSubmit={this.handleSendCode}>
                                    <h1>Login </h1>
                                    <label>Phone No.</label>
                                    <input type="text" placeholder="0123456789" value={this.state.phoneNumber} id="number-input" onChange={this.handlePhoneNumber} />
                                    <button className="btn send-code-btn">send OTP</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
  return {
      userLogin: state.users
  }
}

export default connect(mapStateToProps, { getOTP })(Login);
