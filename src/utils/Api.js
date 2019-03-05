import axios from "axios";
const data = [];

const userLoginApi = (ctrycode, phonenumber) => {
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
//  varifyOptApi
const varifyOptApi = (ctrycode, phonenumber, otp) => {
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

export { userLoginApi, varifyOptApi};


