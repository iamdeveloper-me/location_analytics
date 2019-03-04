class LocationDataService {

    async getLocationData(address){
        let result = await this.getLocationDatafromApi(address);
        //code to fire geoloacation
        return { data: result,
          messages: {
              "successArr": ["Location Data fetched"] 
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
    
    getLocationDatafromApi(address){
        return window.jQuery.ajax({
            url: 'https://c70g0ccj6k.execute-api.us-west-2.amazonaws.com/default/v1/location',
            type: 'post',
            data: JSON.stringify({"address":address}),
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

export default LocationDataService;