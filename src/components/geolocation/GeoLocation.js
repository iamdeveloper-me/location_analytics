import React from 'react';
import  Header  from '../header/Header';
import Footer  from '../footer/Footer';
import { connect } from "react-redux";

// import { getAddress, createMap, addPolygonToMap } from "../../actions/GeoLocationCreator.js";

class GeoLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      address: "", 
      latitude:"", 
      longitude:"" , 
      jsonDataLocation:"", 
      jsonDataAddress:""
    };
  }
  handleAddress(e){
    let state = this.state;
    state.address = e.target.value;
    this.setState(state);
  }

  getLocation(e){
    this.geolocServ.getLocation(this.state.address).then( result => {
        this.popServ.showPopup(result.messages);
        let state = this.state;
        state.jsonDataLocation = JSON.stringify(result.data);
        state.latitude = result.data.data.latitude;
        state.longitude = result.data.data.longitude;
        this.setState(state);
        let pos = result.data.data.postalcodeboundary;
        console.log(this.state);
        this.createMap();
        this.addPolygonToMap(pos.split(","));
    });
  }

  getAddress(e){
      this.geolocServ.getAddress(this.state.latitude,this.state.longitude).then( result => {
          this.popServ.showPopup(result.messages);
          let state = this.state;
          state.jsonDataAddress = JSON.stringify(result.data);
          this.setState(state);
      });
  }

  handleLatitude(e){
      let state = this.state;
      state.latitude = e.target.value;
      this.setState(state);
  }

  handleLongitude(e){
      let state = this.state;
      state.longitude = e.target.value;
      this.setState(state);
  }

  createMap(){
    if(this.map!=null){
        let el = document.getElementById('map');
        el.removeChild(el.firstChild);
    }
    let thiis = this;
    //Step 1: initialize communication with the platform
    let platform = new window.H.service.Platform({
        app_id: 'devportal-demo-20180625',
        app_code: '9v2BkviRwi9Ot26kp2IysQ',
        useHTTPS: true
    });
    let pixelRatio = window.devicePixelRatio || 1;
    let defaultLayers = platform.createDefaultLayers({
        tileSize: pixelRatio === 1 ? 256 : 512,
        ppi: pixelRatio === 1 ? undefined : 320
    });
      
    //Step 2: initialize a map - this map is centered over Europe
    let map = new window.H.Map(document.getElementById('map'),
        defaultLayers.normal.map,{
        center: {lat:thiis.state.latitude, lng:thiis.state.longitude},
        zoom: 13,
        pixelRatio: pixelRatio
    });

    //Step 3: make the map interactive
    // MapEvents enables the event system
    // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
    let behavior = new window.H.mapevents.Behavior(new window.H.mapevents.MapEvents(map));
      
    // Create the default UI components
    let ui = window.H.ui.UI.createDefault(map, defaultLayers);
      
    this.map = map;
  }

  addPolygonToMap(latlong) {
    let lineString = new window.H.geo.LineString(latlong,'values lat lng alt');
    this.map.addObject(
      new window.H.map.Polygon(lineString, {
          style: {
              strokeColor: '#829',
              lineWidth: 3
          }
      })
    );
  }

  render() {
    return (
      <div className="compare-page">
      <Header/>
      <section className="compare-section">
        <div className="row">
            <div className="col-md-12">
                <h3>Address To Lat Long</h3>
                <input type="text" name="location" value={this.state.address} onChange={this.handleAddress}/>
                <button onClick={this.getLocation}>Submit</button>
                <br/>
                <div>{this.state.jsonDataLocation}</div>
            </div>
        </div>
        <div className="row">
            <div className="col-md-12">
                <h3>Lat Long to Address</h3>
                <input type="text" name="latitude" value={this.state.latitude} onChange={this.handleLatitude}/>
                <input type="text" name="longitude" value={this.state.longitude} onChange={this.handleLongitude}/>
                <button onClick={this.getAddress}>Submit</button>
                <br/>
                <div>{this.state.jsonDataAddress}</div>
            </div>
        </div>
        <div className="row">
            <div className="col-md-12">
                <div id="map" style={this.mapStyle} />
            </div>
        </div>
      </section>
      <Footer/>
    </div>
    );
  }
}

const mapStateToProps = state => {
  return {
      state
  }
}

export default connect(mapStateToProps, { getAddress, createMap, addPolygonToMap })(GeoLocation);
