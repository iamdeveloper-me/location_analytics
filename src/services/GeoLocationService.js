class GeoLocationService {

    async getLocation(location){
        let result = await this.getLocationfromApi(location);
        //code to fire geoloacation
        return { data: result,
          messages: {
              "successArr": ["New Geo Location fetched"] 
          }
        };
    }

    async getAddress(latitude,longitude){
        let result = await this.getAddressfromApi(latitude,longitude);
        //code to fire geoloacation
        return { data: result,
          messages: {
              "successArr": ["New Geo Location fetched"] 
          }
        };
    }
    
    getLocationfromApi(location){
        return window.jQuery.ajax({
            url: 'https://c70g0ccj6k.execute-api.us-west-2.amazonaws.com/default/v1/geolocation',
            type: 'post',
            data: JSON.stringify({"address":location}),
            headers: {
                "x-auth-token":"TOKEN123",
                "Content-Type" : "application/x-www-form-urlencoded"
            },
            success: function (data) {
                return data;
            }
        });
    }

    getAddressfromApi(latitude,longitude){
        return window.jQuery.ajax({
            url: 'https://c70g0ccj6k.execute-api.us-west-2.amazonaws.com/default/v1/geolocationrev',
            type: 'post',
            data: JSON.stringify({"latitude":latitude,"longitude":longitude}),
            headers: {
                "x-auth-token":"TOKEN123",
                "Content-Type" : "application/x-www-form-urlencoded"
            },
            success: function (data) {
                return data;
            }
        });
    }


}

export default GeoLocationService;