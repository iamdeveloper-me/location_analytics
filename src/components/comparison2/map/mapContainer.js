import React, { Component } from 'react';

export default class MapContainer extends React.Component {
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
      checkBoxRadius:[],
      radiusOptions: null,
      bounds: null,
      multi_place: [],
      map:null,
      markers: [],
      show: false,
    }
  }
}