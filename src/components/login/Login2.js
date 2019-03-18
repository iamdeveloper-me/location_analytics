import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { connect } from "react-redux"

import { verifyOTP, getOTP } from "../../actions/LoginCreator.js"

class Login2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            handleOtp0:'', 
            countryCode: this.props.match.params.code, 
            phoneNumber: localStorage.getItem("send_otp_num"),
            otp: [0,0,0,0],
            varifyUser:[],
            rememberMe:false
        };
    }

    handleLogin = (e) => {
        e.preventDefault();
        if(this.state.countryCode!=="" && this.state.phoneNumber !=="" ){
            let otp = this.state.otp.join("");   
            this.props.verifyOTP({
                countryCode:this.state.countryCode,
                phoneNumber:this.state.phoneNumber,
                otp:otp
            })
        }
        else{
            this.createNotification('warning', "OTP, phone number and country code fields can't be blank.")
        }
    }

    componentDidMount(){
        // let rem = localStorage.getItem("isAuthenticated");
        let rem = localStorage.getItem("mobile");
        if (rem) {
            this.props.history.push("/dashboard/");
        }
    }

    sendOtp = (e) => {
        this.createNotification('success', 'OTP Resent Successfully.', 5000)
        this.props.getOTP({
            countryCode:this.state.countryCode,
            phoneNumber:this.state.phoneNumber
        })
        // this.popServ.showPopup(this.loginServ.sendOtp(this.state.countryCode,this.state.phoneNumber));
    }

    handleOtp = (value,index) => {
        let state = this.state
        state.otp[index] = value;
        this.setState(state);
    }
    
    handleOtp0 = (e) => {
        this.setState({handleOtp0: e.target.value});
        this.handleOtp(e.target.value,0);
        window.jQuery('input').keyup(function(){
            if(window.jQuery(this).val().length==window.jQuery(this).attr("maxlength")){
                window.jQuery(this).next().focus();
            }
        });
    }
    
    handleOtp1 = (e) => {
        this.handleOtp(e.target.value,1);
    }
    handleOtp2 = (e) => {
        this.handleOtp(e.target.value,2);
    }
    handleOtp3 = (e) => {
        this.handleOtp(e.target.value,3);
    }

    rememberMe(e){
        if(e.target.checked){
            this.setState({
                rememberMe:!this.state.rememberMe
            })
        }else{
            this.setState({
                rememberMe:!this.state.rememberMe
            })
        }
    }

    componentWillReceiveProps(nextProps){
      debugger
        let test = nextProps.varifyUser.otp;
        let props = this.props;
        if (test.token != "") {
            if (this.state.rememberMe) {
                localStorage.setItem("mobile", this.state.phoneNumber);
            }
            localStorage.setItem("isAuthenticated", true);
            // props.history.push("/dashboard/");
            // console.log(test.responseJSON)
            localStorage.setItem("token", test.token);
            localStorage.setItem("mobile_no", test.mobile);
            props.history.push("/dashboard")
        }else{
            this.createNotification('warning', "Please Enter Correct OTP!")
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

    render() {
        console.log("test ",this.props)
        // debugger
        return (
            <section className="login-section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 logo-col login-logo">
                    <img src={process.env.PUBLIC_URL + '/images/logo.svg'} alt="Logo" />
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 login-col">
                        <div className="login-div">
                            <form onSubmit={this.handleLogin}>
                                <h1>Login</h1>
                                <label>Phone No.</label>
                                <input type="text" placeholder="0123456789" value={this.state.phoneNumber} id="number-input" />
                                <label>Enter Code</label>
                                <input type="text" placeholder="0"  onChange={this.handleOtp0} className="code-input" maxLength="1" ref={c => this.nextComponent=c}/>
                                <input type="text" placeholder="0"  onChange={this.handleOtp1} className="code-input" maxLength="1" ref={c => this.nextComponent=c}/>
                                <input type="text" placeholder="0"  onChange={this.handleOtp2} className="code-input" maxLength="1" ref={c => this.nextComponent=c}/>
                                <input type="text" placeholder="0"  onChange={this.handleOtp3} className="code-input no-right-margin" maxLength="1" />
                                <p>Didn’t receive OTP? <a href="javascript:void(0)" onClick={this.sendOtp}>RESEND OTP</a></p>
                                <button className="btn send-code-btn">Login</button>
                                <input type="checkbox" value="true" id="remember_me" onChange={this.rememberMe.bind(this)} />  <span className="rem_bt"> Remember Me </span>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <NotificationContainer/>
        </section>
        );
    } 
}

const mapStateToProps = (state) => {
    return {
      varifyUser: state.users
    }
}

export default connect(mapStateToProps, { verifyOTP, getOTP })(Login2);
