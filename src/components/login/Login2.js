import React from "react";

import { connect } from "react-redux"
import { verifyOTP } from "../../actions/LoginCreator.js"

class Login2 extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      handleOtp0:'', 
      countryCode: window.countrycode,
      phoneNumber: "",
      otp: [0,0,0,0]
    }
  }

   handleLogin = (e) => {
    e.preventDefault();
    if(this.state.countryCode!=="" && this.state.phoneNumber !=="" ){
        //call api service to send otp and mov to next screen to enter otp
        let otp = this.state.otp.join("");            
        this.loginServ.verifyOtp(this.state.countryCode,this.state.phoneNumber,otp).then( result => {
            if(result.data === "success"){
                this.props.history.push("/dashboard/");
            }
            else{
                this.popServ.showPopup(result);
            }
        });
    }
    else{
      alert("OTP, phone number and country code fields can't be blank.")
    }
  }

  sendOtp = (e) => {
    this.popServ.showPopup(this.loginServ.sendOtp(this.state.countryCode,this.state.phoneNumber));
  }

  handleOtp = (value,index) => {
    let state = this.state
    state.otp[index] = value;
    this.setState(state);
  }

  render() {
      return (
        <section className="login-section">
          <div className="container">
              <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 logo-col login-logo">
                  <img src={process.env.PUBLIC_URL + '/images/logo-login.svg'} alt="Logo" />
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 login-col">
                      <div className="login-div">
                        <form onSubmit={this.handleLogin}>
                            <h1>Login</h1>
                            <label>Phone No.</label>
                            {/* <input type="text" placeholder="+1" value={this.state.countryCode} className="country-code-input" /> */}
                            <input type="text" placeholder="0123456789" value={this.state.phoneNumber} id="number-input" />
                            <label>Enter Code</label>
                            <input type="text" placeholder="0"  onChange={this.handleOtp0} className="code-input" maxLength="1" ref={c => this.nextComponent=c}/>
                            <input type="text" placeholder="0"  onChange={this.handleOtp1} className="code-input" maxLength="1" ref={c => this.nextComponent=c}/>
                            <input type="text" placeholder="0"  onChange={this.handleOtp2} className="code-input" maxLength="1" ref={c => this.nextComponent=c}/>
                            <input type="text" placeholder="0"  onChange={this.handleOtp3} className="code-input no-right-margin" maxLength="1" />
                            <p>Didn’t receive code? <a href="javascript:void(0)" onClick={this.sendOtp}>RESEND CODE</a></p>
                            <button className="btn send-code-btn">Login</button>
                        </form>
                      </div>
                  </div>
              </div>
          </div>
        </section>
      );
  } 
}

const mapStateToProps = state => {
  return {
    state
  }
}

export default connect(mapStateToProps, { verifyOTP })(Login2);