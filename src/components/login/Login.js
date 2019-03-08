import React from "react";

import { connect } from "react-redux"

import { getOTP } from "../../actions/LoginCreator.js"


class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            countryCode: window.countrycode,
            phoneNumber: "",
            userLogin: [],
            statusText:""
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

    handleSendCode = (e) => {
      e.preventDefault();
      if(this.state.countryCode!=="" && this.state.phoneNumber !==""){
          //call api service to send otp and mov to next screen to enter otp
          this.props.getOTP({
              countryCode:this.state.countryCode,
              phoneNumber:this.state.phoneNumber
          })
      }
      else{
          alert("Country Code and Phone Number both should be required.")
      }
    }

    componentWillReceiveProps(nextProps){
        let countryCode = this.state.countryCode
        let phoneNumber = this.state.phoneNumber
        let test = nextProps.userLogin.status
        var props = this.props;
        if (test == 200) {
            props.history.push("/login2/" + countryCode + "/" + phoneNumber)
        }
    }

    render(){
        console.log(this.props)
        return(
            <section className="login-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 logo-col">
                            <img src={process.env.PUBLIC_URL + '/images/logo-login.svg'} alt="Logo" />
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 login-col">
                            <div className="login-div">
                                <form onSubmit={this.handleSendCode}>
                                    <h1>Login </h1>
                                    <label>Phone No.</label>
                                    <input type="text" placeholder="0123456789" value={this.state.phoneNumber} id="number-input" onChange={this.handlePhoneNumber} />
                                    <button className="btn send-code-btn">Send Code</button>
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


