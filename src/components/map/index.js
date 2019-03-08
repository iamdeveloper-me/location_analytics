import React, { Component } from 'react';
import LocationDataService from '../../services/LocationDataService';
// import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';


const options = [
    { value: '5', label: '5 Miles' },
    { value: '10', label: '10 Miles' }
];

export default class MapContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      place_lat:41.850033, 
      place_lng:-87.6500523,
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      zoom: 4,
      maptype: 'roadmap',
      checkBoxRadius:[5],
      radiusOptions: null,
      bounds: null,
      multi_place: [],
      map:null,
      markers: [],
      show: false,
    }
    this.locDataServ = new LocationDataService();
  }

  createMap(){
    let map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: this.state.place_lat, lng: this.state.place_lng},
      zoom: this.state.zoom,
      zoomControl: true,
      mapTypeControl: true,
      scaleControl: true,
      streetViewControl: false,
      rotateControl: true,
      fullscreenControl: false,
      mapTypeControlOptions: {
        style: window.google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: window.google.maps.ControlPosition.LEFT_BOTTOM
      },
    })
    this.setState({
      map:map
    });
    map.addListener('zoom_changed', () => {
      this.setState({
        zoom: map.getZoom(),
        // map:map
      });
    });

    map.addListener('maptypeid_changed', () => {
      this.setState({
        maptype: map.getMapTypeId(),
      });
    });

    // initialize the autocomplete functionality using the #pac-input input box

    let inputNode = document.getElementById('pac-input');
    let autoComplete = new window.google.maps.places.Autocomplete(inputNode);
    autoComplete.addListener('place_changed', () => {
      let place = autoComplete.getPlace();
      if (place.geometry != undefined) {
        let location = place.geometry.location;
        /* multipe marker locations */
        let { multi_place } = this.state;
        multi_place.push( { "place":place, "location":location, circles:[] } )
        this.addMarker(map, (multi_place.length-1) );
      }
    });
  }

  removeMarkers(map, multi_place_index){
    var {markers} = this.state
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }

    let bounds = new window.google.maps.LatLngBounds();
    this.state.bounds = bounds;
    map.fitBounds(bounds);
    map.setCenter({lat: this.state.place_lat, lng: this.state.place_lng});
    let zoom = map.getZoom();
    map.setZoom(zoom > 4 ? 4 : zoom);
    this.removeCircles(0);
    this.setState({markers:[],bounds:null,zoom:zoom,multi_place:[]});
    this.props.callbackFromParent(this.state.multi_place);
  }

  addMarker(map, multi_place_index){
    let mpObj = this.state.multi_place[multi_place_index];
    let center = {lat: mpObj.location.lat(), lng: mpObj.location.lng()};
    let marker = new window.google.maps.Marker({
      map: map,
      position: mpObj.location,
    });
    var {markers} = this.state
    markers.push(marker)
    this.setState({markers:markers})
    this.props.callbackFromParent(this.state.multi_place);

    let infowindow = new window.google.maps.InfoWindow();
    window.google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent('<div><strong>' + mpObj.place.name + '</strong><br>' +
      mpObj.place.formatted_address + '</div>');
      infowindow.open(map, this);
    });

    let bounds = this.state.bounds;
    if(bounds == null){
      bounds = new window.google.maps.LatLngBounds();
      this.state.bounds = bounds;
    }
    bounds.extend(marker.getPosition());
    map.setCenter(mpObj.location);
    this.setCircles();

    /* place details */
    var request = {
      placeId: mpObj.place.place_id,
      fields: ['name', 'formatted_address']
    };
    
    var service = new window.google.maps.places.PlacesService(map);
    this.placeDetails(marker, map, request, mpObj.location, mpObj.place, infowindow, service);
    map.fitBounds(bounds);
    let zoom = map.getZoom();
    map.setZoom(zoom > 13 ? 13 : zoom);

    this.locDataServ.getLocationData(mpObj.location.lat(),mpObj.location.lng());
  }

  placeDetails(marker, map, request, location, place, infowindow, service){
    service.getDetails(request, function(place, status) {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        window.google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
          place.formatted_address + '</div>');
          infowindow.open(map, this);
        });
      }
    });
  }

  componentDidMount() {
    this.createMap();
    this.props.getRedius(this.state.checkBoxRadius)
  }

  setCircles(){
    let map = this.state.map;
    let radiusOptions = null
    radiusOptions = this.state.radiusOptions;
    if (radiusOptions == null) {
      radiusOptions = this.state.checkBoxRadius;
    }
    let mps = this.state.multi_place;
    for(let mpi in mps){
      if (radiusOptions != null) {
        for (var i = 0; i < radiusOptions.length; i++) {
          let ro = parseInt(radiusOptions[i]);
          if(mps[mpi].circles[ro] == undefined){
            mps[mpi].circles[ro] = new window.google.maps.Circle({
              map: map,
              radius: ro * 160,
              fillColor: '#f97474',
              fillOpacity: 0.3,
              strokeWeight: 0,
              center: {lat: mps[mpi].location.lat(), lng: mps[mpi].location.lng()},
            });
          }
        }
      }
    }
  }

  removeCircles(setCircles){
    if(setCircles == undefined){
      setCircles = 1;
    }
    let mps = this.state.multi_place;
    for(let mpi in mps){
      for( let c in mps[mpi].circles){
        if(mps[mpi].circles[c] != undefined){
          mps[mpi].circles[c].setMap(null);
          mps[mpi].circles[c] = undefined;
        }
      }
    }
    if(setCircles == 1){
      this.setCircles();
    }
  }

  searchAddress(e){
    // this.setState({initialAddress:e.target.value});
  }

  handleRadiusCheckbox(e){
    var CheckboxRadius = this.state.checkBoxRadius
    let index 
    if(e.target.checked){
      CheckboxRadius.push(+e.target.value)
      this.addRadiusOnMap(CheckboxRadius);
      this.props.getRedius(this.state.checkBoxRadius)
    }
    else{
      index = CheckboxRadius.indexOf(+e.target.value)
      CheckboxRadius.splice(index, 1)
      this.removeRadiusOnMap(CheckboxRadius);
      this.props.getRedius(this.state.checkBoxRadius)
    }
  }

  handleRadiusCheckbox10(e){
    var CheckboxRadius = this.state.checkBoxRadius
    let index 
    if(e.target.checked){
      CheckboxRadius.push(+e.target.value)
      this.addRadiusOnMap(CheckboxRadius);
      this.props.getRedius(this.state.checkBoxRadius)
    }
    else{
      index = CheckboxRadius.indexOf(+e.target.value)
      CheckboxRadius.splice(index, 1)
      this.removeRadiusOnMap(CheckboxRadius);
      this.props.getRedius(this.state.checkBoxRadius);
    }
  }

   addRadiusOnMap(objsSelected){
      let state = this.state;
      state.radiusOptions = objsSelected;
      this.setState(state);
      this.setCircles();
    }

    removeRadiusOnMap(objsSelected){
      let state = this.state;
      state.radiusOptions = objsSelected; 
      this.setState(state);
      this.removeCircles();
    }

  CheckBoxs(){
    return(
      <div>
      {
      options.map(item => (
      <label className="check_radius check_radiusMr2"  key={item.value}>
        { item.value == "5" ? 
          <div><input type="checkbox"  value={item.value}  onChange={this.handleRadiusCheckbox.bind(this)} defaultChecked={item.value} /><span> {item.label}</span></div>
        : 
          <div><input type="checkbox"  value={item.value}  onChange={this.handleRadiusCheckbox10.bind(this)}  /><span> {item.label}</span></div>
        }
      </label>
       ))
      }
      </div>
    )
  }

  resetAutocompleteMarker(){
    let {multi_place} = this.state
    if (multi_place != "") {
      this.removeMarkers(this.state.map, (multi_place.length-1) )
    }
    document.getElementById('pac-input').value = '';
    this.setState({show: false})
  }

  resetAutocompleteBox(){
    document.getElementById('pac-input').value = '';
    this.setState({show: false})
  }
  mapAutocomplete(e){
    if (e.target.value != "") {
      this.setState({show: true}) 
    }else{
      this.setState({show: false}) 
    }

  }

  render() {
    return (
      <div id='app'>
        <div id='pac-container'>
          <div className="col-md-6">
            <input id='pac-input'  type='text' placeholder='Enter a location' onChange={this.mapAutocomplete.bind(this)}/>
            {this.state.show ? 
              <button type="button" className="mapbtn" onClick={this.resetAutocompleteBox.bind(this)}> 
                <i className="material-icons">add_location</i>
              </button>
            :
              <span></span>
            }
              <button type="button" className="mapbtn" onClick={this.resetAutocompleteMarker.bind(this)}>
                <i className="material-icons">clear</i>
              </button>
            
          </div>

          <div className="col-md-6">
            {this.CheckBoxs()}
          </div>        
        </div>
        <div id='map' />
      </div>
    );
  }
}
