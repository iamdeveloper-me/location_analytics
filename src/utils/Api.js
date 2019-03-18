import axios from "axios";
import $ from "jquery";


const userLoginApi = (headers, dd, url, method) => {
    
    if (method == "post") {
        window.jQuery.ajax({
        url: url,
        type: "POST",
        data: JSON.stringify(JSON.parse(dd)),
        headers: headers,
        success: function (data) {
            debugger
            return data.data;
        },
        error: function (err) {
            alert("!!!!!!!!!!!!! something Went Wrong !");
        }
    });
    }
}

export default userLoginApi;

/*
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
*/