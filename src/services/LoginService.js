
class LoginService {

    async sendOtp(ctrycode,phonenumber){
        let result = await this.userLoginApi(ctrycode,phonenumber);
        //code to fire geoloacation
        // debugger
        if(phonenumber == result.otp.mobile){
            return {"data":"success","successArr": ["OTP Send to " + ctrycode + " " + phonenumber] };
        }
        else{
            return {"data":"failed","errorArr": ["Invalid Phone Number only Default phone number allowed"] };
        }
    }
    userLoginApi(ctrycode, phonenumber){
        return window.jQuery.ajax({
            url: 'https://stap7kgv0c.execute-api.us-west-2.amazonaws.com/default/v1/customers/otp/new',
            type: 'post',
            data: JSON.stringify({"otp":{"mobile_country_code":ctrycode, "mobile":phonenumber, "device_token":"tokendevice123"}}),
            headers: {
                "x-auth-token":"TOKEN123",
                "Content-Type" : "application/x-www-form-urlencoded"
            },
            success: function (data) {
                return data;
            },
            error: function (err) {
                alert("something Went Wrong !");
            }
        });
    }

    async verifyOtp(ctrycode,phonenumber,otp){
        let result = await this.verifyOtpApi(ctrycode,phonenumber,otp);
        
        //code to fire geoloacation
        if(phonenumber == result.otp.mobile){
            return {"data":"success","successArr": ["OTP("+ otp +") Verified from "  + ctrycode + " " + phonenumber] };
        }
        else{
            return {"data":"failed","errorArr": ["Invalid OTP only Default OTP allowed"] };
        }
    }
    verifyOtpApi(ctrycode, phonenumber, otp){
        return window.jQuery.ajax({
            url: 'https://stap7kgv0c.execute-api.us-west-2.amazonaws.com/default/v1/customers/otp/verify',
            type: 'post',
            data: JSON.stringify({"otp":{
                "mobile":phonenumber,
                "mobile_country_code":ctrycode,
                "device_token":"tokendevice123",
                "code": otp
                }
            }),
            headers: {
                "x-auth-token":"TOKEN123",
                "Content-Type" : "application/x-www-form-urlencoded"
            },
            success: function (data) {
                return data;
            },
            error: function (err) {
                alert(err.responseJSON.otp.code);
            }
        });
    }
}

export default LoginService;