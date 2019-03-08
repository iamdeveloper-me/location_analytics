import React, { Component } from 'react';
import { connect } from "react-redux"
import  Header  from '../header/Header';
import Footer  from '../footer/Footer';
// import GeoLocationService from '../services/GeoLocationService';
// import LocationDataService from '../services/LocationDataService';
// import PopupService from '../services/PopupService';
// import PopupDetail from './popup/popupdetails';
import './popup/popup.css';
import MapContainer from '../map/index.js';

import { verifyOTP, getOTP } from "../../actions/LoginCreator.js"

const color_code = { 
    "Power Elite": "#494595",
    "Flourishing Families": "#8792fc",
    "Booming with Confidence": "#b85db9",
    "Suburban Style": "#f59afd",
    "Thriving Boomers": "#a7b0d3",
    "E21 Unspoiled Splendor": "",
    "Promising Families": "#005198",
    "Young City Solos": "#fe411e",
    "Middle-class Melting Pot": "#eb5f7a",
    "Family Union": "#f9913d",
    "Autumn Years":"#c74158",
    "Significant Singles": "#33ceae",
    "Blue Sky Boomers": "#345d2a",
    "Families in Motion": "#63bd1d",
    "Pastoral Pride": "#339bc3",
    "N49 Touch of Tradition": "",
    "Singles and Starters": "#818181",
    "O52 Urban Ambition": "",
    "Cultural Connections": "#ffea69",
    "Golden Year Guardians": "#6e2219",
    "Aspirational Fusion": "#debc2f",
    "Economic Challenges": "#90741c"
}
const segment = {
    "Power Elite": 
    [
        ["American Royalty", ""], 
        ["Platinum Prosperity", ""],
        ["Kids and Cabernet", ""],
        ["Picture Perfect Families", ""],
        ["Couples with Clout", ""],
        ["Jet Set Urbanites", ""]
    ], 
    "Promising Families": 
    [
        ["Fast Track Couples", ""],
        ["Families Matter Most", ""]
    ], 
    "Significant Singles": 
    [
        ["Wired for Success", ""],
        ["Gotham Blend", ""],
        ["Metro Fusion", ""],
        ["Bohemian Groove", ""]
    ], 
    "Autumn Years": 
    [
        ["Aging in Place", ""],
        ["Rural Escape", ""],
        ["Settled and Sensible", ""]
    ], 
    "Blue Sky Boomers": 
    [
        ["Booming and Consuming", ""],
        ["Rooted Flower Power", ""],
        ["Homemade Happiness", ""]
    ], 
    "Booming with Confidence": 
    [
        ["Aging of Aquarius", ""],
        ["Golf Carts and Gourmets", ""],
        ["Silver Sophisticates", ""],
        ["Boomers and Boomerangs", ""]
    ], 
    "Cultural Connections": 
    [
        ["Mid-scale Medley", ""],
        ["Modest Metro Means", ""],
        ["Heritage Heights", ""],
        ["Expanding Horizons", ""],
        ["Striving Forward", ""]
    ], 
    "Families in Motion":
    [
        ["Red, White and Bluegrass", ""],
        ["Diapers and Debit Cards", ""]
    ], 
    "Family Union":
    [
        ["Stockcars and State Parks", ""],
        ["Blue Collar Comfort", ""],
        ["Steadfast Conventionalists", ""],
        ["Balance and Harmony", ""]
    ], 
    "Flourishing Families":
    [
        ["Generational Soup", ""],
        ["Babies and Bliss", ""],
        ["Family Fun-tastic", ""],
        ["Cosmopolitan Achievers", ""]
    ], 
    "Middle-class Melting Pot":
    [
        ["Progressive Potpourri", ""],
        ["Birkenstocks and Beemers", ""],
        ["Everyday Moderates", ""],
        ["Destination Recreation", ""]
    ], 
    "Pastoral Pride":
    [
        ["True Grit Americans", ""],
        ["Countrified Pragmatics", ""],
        ["Rural Southern Bliss", ""],
        ["Touch of Tradition", ""]
    ], 
    "Singles and Starters":
    [
        ["Full Steam Ahead", ""],
        ["Digital Dependents", ""],
        ["Urban Ambition", ""],
        ["Colleges and Cafes", ""],
        ["Striving Single Scene", ""],
        ["Family Troopers", ""]
    ], 
    "Suburban Style":
    [
        ["Sports Utility Families", ""],
        ["Settled in Suburbia", ""],
        ["Cul de Sac Diversity", ""],
        ["Suburban Attainment", ""]
    ], 
    "Young City Solos":
    [
        ["Status Seeking Singles", ""],
        ["Urban Edge", ""]
    ], 
    "Aspirational Fusion":
    [
        ["Dare to Dream", ""],
        ["Hope for Tomorrow", ""]
    ], 
    "Economic Challenges":
    [
        ["Reaping Rewards", ""],
        ["Footloose and Family Free", ""],
        ["Town Elders", ""],
        ["Senior Discounts", ""]
    ], 
}

class Comparison2 extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      address: "", 
      multi_place:[], 
      latitude:"41.850033", 
      longitude:"-87.6500523" , 
      jsonDataLocation:"", 
      jsonDataAddress:"", 
      cardViewData:[], 
      MS_STRING:"", 
      isMosaicSegmentData: false, 
      isChecked:false, 
      checkBoxObj:{
        "Demographics":{},
        "Traffic":{},
        "Mosaic Segments":{
          "Power Elite":{},
          "Promising Families":{},
          "Significant Singles":{},
          "Autumn Years": {},
          "Blue Sky Boomers":{},
          "Booming with Confidence": {},
          "Cultural Connections": {},
          "Families in Motion":{},
          "Family Union":{},
          "Flourishing Families":{},
          "Middle-class Melting Pot":{},
          "Pastoral Pride":{},
          "Singles and Starters":{},
          "Suburban Style":{},
          "Young City Solos":{},
          "Aspirational Fusion":{},
          "Economic Challenges":{}
        },
        "Miles":{},
      }
    }
    this.handleMapView = this.handleMapView.bind(this);
    this.handleCardView = this.handleCardView.bind(this);
    this.getAddress = this.getAddress.bind(this);
    // this.showModal = this.showModal.bind(this);
    this.toggleHeader = this.toggleHeader.bind(this)
    this.handleCardViewAddress = this.handleCardViewAddress.bind(this);
    // this.popServ = new PopupService();
    // this.geolocServ = new GeoLocationService();
    // this.locDataServ = new LocationDataService();
    this.showHeaderView = 1;
    this.showFullMap = this.showFullMap.bind();
    // this.onChangeForAllElements = this.onChangeForAllElements.bind();
    this.error = null;

  };

  handleMapView(){
    window.jQuery('#topics_dv').addClass('hide');
    window.jQuery('#full_div').addClass('full_width');
    window.jQuery("#show-sidebar").hide();
    if(this.state.address!="" && this.state.address!=null){
        this.getLocation();
    }
    else{
        let thiis2 = this;
        setTimeout(function(){thiis2.getAddress();},2000);
    }
  }

      handleCardView(){
        this.initiateColsData();
        //window.jQuery("#show-sidebar").show();
        window.jQuery('#topics_dv').removeClass('hide');
        window.jQuery('#full_div').removeClass('full_width');
        this.forceUpdate();
    }

        getAddress(e){
        this.geolocServ.getAddress(this.state.latitude,this.state.longitude).then( result => {
            let state = this.state;
            state.jsonDataAddress = JSON.stringify(result.data);
            state.address = result.data.data.label;
            state.boundary = result.data.data.postalcodeboundary;
            this.setState(state);
        });
    }
    toggleHeader(e){
        if(this.showHeaderView===1){
            this.showHeaderView = 0;
            this.hideHeader();        
        }
        else{
            this.showHeaderView = 1;
            this.showHeader();
        }
    }
    handleCardViewAddress(e){
        // let col = e.currentTarget.getAttribute('data-col');
        // let address = e.currentTarget.getAttribute('data-address');
        // this.getLocationData(address,col);
    }
    showFullMap(){
        window.jQuery('.maxContainer').removeClass('container-fluid');
        window.jQuery('.maxContainer').css("overflow","hidden");
    }
    demographicsCheckBox(event){
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        let obj = this.state.checkBoxObj
        if (value) {
            obj["Demographics"][name] = value
        }else{
            delete obj["Demographics"][name];
        }
        this.setState({checkBoxObj: obj})
    }

    trafficCheckBox(event){
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        let obj = this.state.checkBoxObj
        if (value) {
            obj["Traffic"][name] = value
        }else{
            delete obj["Traffic"][name];
        }
        this.setState({checkBoxObj: obj})
    }

    // compititorsCheckBox(event){
    //     const target = event.target;
    //     const value = target.type === 'checkbox' ? target.checked : target.value;
    //     const name = target.name;
    //     let obj = this.state.checkBoxObj
    //     if (value) {
    //         obj["Competitors"][name] = value
    //     }else{
    //         delete obj["Competitors"][name];
    //     }
    //     this.setState({checkBoxObj: obj})
    // }

    segmentsCheckBox(event){
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        const dataset = target.dataset.name
        
        let obj = this.state.checkBoxObj
        if (dataset == "Power Elite") {
          if (value) {
              obj["Mosaic Segments"]["Power Elite"][name] = value
          }else{
              delete obj["Mosaic Segments"]["Power Elite"][name];
          }
        }else if (dataset == "Promising Families") {
          if (value) {
              obj["Mosaic Segments"]["Promising Families"][name] = value
          }else{
              delete obj["Mosaic Segments"]["Promising Families"][name];
          }
        }else if (dataset == "Significant Singles") {
          if (value) {
              obj["Mosaic Segments"]["Significant Singles"][name] = value
          }else{
              delete obj["Mosaic Segments"]["Significant Singles"][name];
          }
        }else if (dataset == "Autumn Years") {
          if (value) {
              obj["Mosaic Segments"]["Autumn Years"][name] = value
          }else{
              delete obj["Mosaic Segments"]["Autumn Years"][name];
          }
        }else if (dataset == "Blue Sky Boomers") {
          if (value) {
              obj["Mosaic Segments"]["Blue Sky Boomers"][name] = value
          }else{
              delete obj["Mosaic Segments"]["Blue Sky Boomers"][name];
          }
        }else if (dataset == "Booming with Confidence") {
          if (value) {
              obj["Mosaic Segments"]["Booming with Confidence"][name] = value
          }else{
              delete obj["Mosaic Segments"]["Booming with Confidence"][name];
          }
        }else if (dataset == "Cultural Connections") {
          if (value) {
              obj["Mosaic Segments"]["Cultural Connections"][name] = value
          }else{
              delete obj["Mosaic Segments"]["Cultural Connections"][name];
          }
        }else if (dataset == "Families in Motion") {
          if (value) {
              obj["Mosaic Segments"]["Families in Motion"][name] = value
          }else{
              delete obj["Mosaic Segments"]["Families in Motion"][name];
          }
        }else if (dataset == "Family Union") {
          if (value) {
              obj["Mosaic Segments"]["Family Union"][name] = value
          }else{
              delete obj["Mosaic Segments"]["Family Union"][name];
          }
        }else if (dataset == "Flourishing Families") {
          if (value) {
              obj["Mosaic Segments"]["Flourishing Families"][name] = value
          }else{
              delete obj["Mosaic Segments"]["Flourishing Families"][name];
          }
        }else if (dataset == "Middle-class Melting Pot") {
          if (value) {
              obj["Mosaic Segments"]["Middle-class Melting Pot"][name] = value
          }else{
              delete obj["Mosaic Segments"]["Middle-class Melting Pot"][name];
          }
        }else if (dataset == "Pastoral Pride") {
          if (value) {
              obj["Mosaic Segments"]["Pastoral Pride"][name] = value
          }else{
              delete obj["Mosaic Segments"]["Pastoral Pride"][name];
          }
        }else if (dataset == "Singles and Starters") {
          if (value) {
              obj["Mosaic Segments"]["Singles and Starters"][name] = value
          }else{
              delete obj["Mosaic Segments"]["Singles and Starters"][name];
          }
        }else if (dataset == "Suburban Style") {
          if (value) {
              obj["Mosaic Segments"]["Suburban Style"][name] = value
          }else{
              delete obj["Mosaic Segments"]["Suburban Style"][name];
          }
        }else if (dataset == "Young City Solos") {
          if (value) {
              obj["Mosaic Segments"]["Young City Solos"][name] = value
          }else{
              delete obj["Mosaic Segments"]["Young City Solos"][name];
          }
        }else if (dataset == "Aspirational Fusion") {
          if (value) {
              obj["Mosaic Segments"]["Aspirational Fusion"][name] = value
          }else{
              delete obj["Mosaic Segments"]["Aspirational Fusion"][name];
          }
        }else if (dataset == "Economic Challenges") {
          if (value) {
              obj["Mosaic Segments"]["Economic Challenges"][name] = value
          }else{
              delete obj["Mosaic Segments"]["Economic Challenges"][name];
          }
        }
        this.setState({checkBoxObj: obj})
    }

    getRedius(miles){
        let obj = this.state.checkBoxObj
        if (miles) {
            obj["Miles"] = miles
        }else{
            delete obj["Miles"];
        }
        this.setState({checkBoxObj: obj})
    }

    callbackMapData(multi_place){
        this.setState({multi_place:multi_place})
    }
  render(){
    let col_class = (this.state.cardViewData.length > 0) ? (12 / this.state.cardViewData.length) : 12;
    return(
      <div className="compare-page v3_screen page-wrapper chiller-theme">
  <a id="show-sidebar" className="btn btn-sm btn-dark" href="javascript:void(0);">
   <span><img src="images/np_decline-graph.svg"/></span>
  </a> 
  <nav id="sidebar" className="sidebar-wrapper">
    <div className="sidebar-content">
      <div className="sidebar-brand">
        <a href="#"><img src="images/np_decline-graph.svg"/> INSIGHTS</a>
        <div id="close-sidebar">
          <i className="fa fa-angle-left"></i>
        </div>
      </div>
      <div className="sidebar-search">
        <div>
            <p>Select insights to begin configuring insights for your report.</p>
          <div className="form-group">
            <input type="text" className="form-control search-menu" placeholder="Search insights…" />
          </div>
        </div>
      </div>
      <div className="sidebar-menu">
        <ul>
          <li className="sidebar-dropdown active">
            <a href="#">
              <span>DEMOGRAPHICS</span>
            </a>
            <div className="sidebar-submenu">
              <ul>
                <li>
                  <a href="#">SUB-INSIGHT</a>
                </li>
                <li>
                  <a href="#">SUB-INSIGHT</a>
                </li>
                <li>
                  <a href="#">SUB-INSIGHT</a>
                </li>
                <li>
                  <a href="#">SUB-INSIGHT</a>
                </li>
                <li>
                  <a href="#">SUB-INSIGHT</a>
                </li>
                <li>
                  <a href="#">SUB-INSIGHT</a>
                </li>
              </ul>
            </div>
          </li>
          <li className="sidebar-dropdown">
            <a href="#">
              <span>TRAFFIC</span>
            </a>
            <div className="sidebar-submenu">
              <ul>
                <li>
                  <a href="#">SUB-INSIGHT</a>
                </li>
                <li>
                  <a href="#">SUB-INSIGHT</a>
                </li>
                <li>
                  <a href="#">SUB-INSIGHT</a>
                </li>
              </ul>
            </div>
          </li>
          <li className="sidebar-dropdown">
            <a href="#">
              <span>Components</span>
            </a>
            <div className="sidebar-submenu">
              <ul>
                <li>
                  <a href="#">SUB-INSIGHT</a>
                </li>
                <li>
                  <a href="#">SUB-INSIGHT</a>
                </li>
                <li>
                  <a href="#">SUB-INSIGHT</a>
                </li>
              </ul>
            </div>
          </li>
          <li className="sidebar-dropdown">
            <a href="#">
              <span>POINT OF INTEREST</span>
            </a>
            <div className="sidebar-submenu">
              <ul>
               <li>
                  <a href="#">SUB-INSIGHT</a>
                </li>
                <li>
                  <a href="#">SUB-INSIGHT</a>
                </li>
                <li>
                  <a href="#">SUB-INSIGHT</a>
                </li>
              </ul>
            </div>
          </li>
          <li className="sidebar-dropdown">
            <a href="#">
              <span>MOSAIC SEGMENTS</span>
            </a>
            <div className="sidebar-submenu">
              <ul>
                <li>
                  <a href="#">SUB-INSIGHT</a>
                </li>
                <li>
                  <a href="#">SUB-INSIGHT</a>
                </li>
                <li>
                  <a href="#">SUB-INSIGHT</a>
                </li>
            </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  
            <section className="compare-section">
                <div className="container-fluid maxContainer">
                    <div className="row">
                        <div id="viewSelectDiv" className="col-lg-12 col-md-12 col-sm-12 col-xs-12 tabs-col">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 tabs-div">
                                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-6 Divlogo">
                                <a href="/"> 
                                  <img src={window.staticurl + '/images/logo.svg'} alt="Logo" /> 
                                </a>
                                </div>
                                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-6 preference-col">

                                </div>
                                <div className="col-xs-6 col-sm-4 download-col visible-xxs profile-col">
                                    <div className="profile-div">
                                        <div className="avoid-clicks btn-group" role="group">
                                            <p>J</p>
                                            <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i className="fa fa-chevron-down"></i></button>

                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 cards-map-view-col">
                                    <ul className="nav nav-tabs" role="tablist">
                                        <li role="presentation" id="cards_map_tab" onClick={this.handleCardView}>
                                         <a href="#cardsView" aria-controls="cardsView" role="tab" data-toggle="tab">Cards View</a>
                                        </li>
                                        <li role="presentation" className="active" id="mapview_tab" onClick={this.handleMapView}>
                                         <a href="#mapView" aria-controls="mapView" role="tab" data-toggle="tab">Map View</a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-4 download-col hidden-xxs ">
                                <div className="dropdown">
                                <button id="dLabel2" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fa fa-file-archive-o"></i> Downloads </button>
                                        
                                    </div>
                                </div>
                                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-4 download-col hidden-xxs profile-col">
                                    <div className="profile-div">
                                        <div className="btn-group" role="group">
                                            <p>J</p>
                                            <button type="button" className="avoid-clicks btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i className="fa fa-chevron-down"></i></button>
                                            {/* <ul className="dropdown-menu">
                                                <li><a href="/">Dropdown link</a></li>
                                                <li><a href="/">Dropdown link</a></li>
                                            </ul> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="contentColCheck" className="col-lg-12 col-md-12 col-sm-12 col-xs-12 content-col">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 tab-content fade in full_width" id="full_div">
                                <div role="tabpanel" className="col-lg-12 col-md-12 col-sm-12 col-xs-12 tab-pane fade" id="cardsView">
                                {this.state.cardViewData.length < 1 ? 
                                    <div className="col-md- col-sm-12 content-card-col">
                                        <h2 className="select_address">Please select at least 1 address from Map View</h2>
                                    </div>
                                : 
                                this.state.cardViewData.map((col, j) => {     
                                    return (
                                        <div key={j} className={"col-md-" + col_class + " col-sm-12 content-card-col"}>
                                            <div className="address-div">
                                                <div className="dropdown">
                                                    <button id="dLabel3" type="button" title={col.address} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <span className="caret"></span>{this.truncate55(col.address)}
                                                    </button>
                                                    {/*<ul className="dropdown-menu" aria-labelledby="dLabel3">
                                                       <li><a data-address="3023 Walnut St., Boulder, CO, Greater Denver,80301" data-col={j} href="javascript:void(0)" onClick={this.handleCardViewAddress}>3023 Walnut St., Boulder, CO, Greater Denver,80301</a></li>
                                                        <li><a data-address="28245 S Tamiami Trl Ste 130    Bonita Springs, FL, Florida,34134" data-col={j} href="javascript:void(0)" onClick={this.handleCardViewAddress}>28245 S Tamiami Trl Ste 130    Bonita Springs, FL, Florida,34134</a></li>
                                                        <li><a data-address="2515,W.,Maple    Bloomfield, MI, Greater Detroit,48301" data-col={j}  href="javascript:void(0)" onClick={this.handleCardViewAddress}>2515,W.,Maple    Bloomfield, MI, Greater Detroit,48301</a></li>
                                                        <li><a data-address="13649 Providence, Weddington, NC, 28104" data-col={j}  href="javascript:void(0)" onClick={this.handleCardViewAddress}>13649 Providence, Weddington, NC, 28104</a></li>
                                                    </ul>*/}
                                                </div>
                                            </div>
                                            <div className="content-div">
                                                <div className="inner-div rating-div">
                                                    <p>TableArt Score</p>
                                                    <h3>{col.score}</h3>
                                                </div>
                                                <div className=" topics-col">
                                                    <div className="topics-div">
                                                        <div className="panel-group" id="accordionCV" role="tablist" aria-multiselectable="true">
                                                        {col.dataCols.map((rec, i) => {
                                                            return (
                                                                <div key={i} className="panel">
                                                                    <div className="panel-heading" role="tab" id={("heading" +"_" + j + "_" +i)}>
                                                                        <h4 className="panel-title"><a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordionCV" href={ ("#col"+"_" + j + "_" +i) } aria-expanded="false" aria-controls={ ("col"+"_" + j + "_" +i) }><i className="fa fa-caret-up"></i> {rec.title}</a></h4>
                                                                    </div>
                                                                    <div id={ ("col"+"_" + j + "_" +i) } className="available-items panel-collapse collapse" role="tabpanel" aria-labelledby={("heading" +"_" + j + "_" +i)}>
                                                                        <div className="panel-body">
                                                                                <div><div>
                                                                                <h3 dangerouslySetInnerHTML={{__html: rec.detailText}}></h3>
                                                                                </div></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ) 
                                                        })}                                                        
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        </div>
                                        )
                                    })}
                                </div>
                                {/* tab map */}
                                <div role="tabpanel" className="col-lg-12 col-md-12 col-sm-12 col-xs-12 tab-pane fade in active" id="mapView">
                                    <div className="tabbable-panel">
                                        <div className="tabbable-line dropdown">
                                            <ul className="nav nav-tabs ">
                                                <li className="">
                                                <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="javascript:void(0)" role="button" aria-haspopup="true" aria-expanded="false">Demographics<span className="fa fa-caret-down pull-right"></span></a>
                                                    
                                                    <div className="table-responsive dropdown-menu available-items" >
                                                        <form>
                                                        <table className="menu-item table table-condensed table-striped table-hover m0 width330px">
                                                                <tbody>
                                                                <tr>
                                                                    <td>Total Population
                                                                    </td>
                                                                    <td>
                                                                        <label className="switch left_check">
                                                                        <input
                                                                        name="Total Population"
                                                                        type="checkbox"
                                                                        onChange={this.demographicsCheckBox.bind(this)} />
                                                                       
                                                                        <span className="slider round"></span>
                                                                        </label>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        Population 18-34 age
                                                                    </td>
                                                                    <td><label className="switch left_check">
                                                                    <input type="checkbox" name="Population 18-34 age" onChange={this.demographicsCheckBox.bind(this)} />
                                                                    <span className="slider round"></span>
                                                                    </label>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        Population 10-21 age
                                                                    </td>
                                                                    <td><label className="switch left_check">
                                                                    <input name="Population 10-21 age" type="checkbox"onChange={this.demographicsCheckBox.bind(this)} />
                                                                    <span className="slider round"></span>
                                                                    </label>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        Population 40 + age
                                                                    </td>
                                                                    <td><label className="switch left_check">
                                                                    <input name="Population 40 + age" type="checkbox" onChange={this.demographicsCheckBox.bind(this)}/>
                                                                    <span className="slider round"></span>
                                                                    </label>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        Female Population
                                                                    </td>
                                                                    <td><label className="switch left_check">
                                                                    <input name="Female Population" type="checkbox" onChange={this.demographicsCheckBox.bind(this)}/>
                                                                    <span className="slider round"></span>
                                                                    </label>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        Male Population
                                                                    </td>
                                                                    <td><label className="switch left_check">
                                                                    <input name="Male Population" type="checkbox" onChange={this.demographicsCheckBox.bind(this)}/>
                                                                    <span className="slider round"></span>
                                                                    </label>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        Total Daytime Population
                                                                    </td>
                                                                    <td><label className="switch left_check">
                                                                    <input name="Total Daytime Population" type="checkbox" onChange={this.demographicsCheckBox.bind(this)}/>
                                                                    <span className="slider round"></span>
                                                                    </label>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        Average Household income
                                                                    </td>
                                                                    <td><label className="switch left_check">
                                                                    <input name="Average Household income" type="checkbox" onChange={this.demographicsCheckBox.bind(this)}/>
                                                                    <span className="slider round"></span>
                                                                    </label>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        Median Housing Income
                                                                    </td>
                                                                    <td><label className="switch left_check">
                                                                    <input type="checkbox" name="Median Housing Income" onChange={this.demographicsCheckBox.bind(this)}/>
                                                                    <span className="slider round"></span>
                                                                    </label>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        Per Capita income
                                                                    </td>
                                                                    <td><label className="switch left_check">
                                                                    <input type="checkbox" name="Per Capita income" onChange={this.demographicsCheckBox.bind(this)}/>
                                                                    <span className="slider round"></span>
                                                                    </label>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        Total Housing Units
                                                                    </td>
                                                                    <td><label className="switch left_check">
                                                                    <input type="checkbox" name="Total Housing Units" onChange={this.demographicsCheckBox.bind(this)}/>
                                                                    <span className="slider round"></span>
                                                                    </label>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        Total Households
                                                                    </td>
                                                                    <td><label className="switch left_check">
                                                                    <input type="checkbox" name="Total Households" onChange={this.demographicsCheckBox.bind(this)}/>
                                                                    <span className="slider round"></span>
                                                                    </label>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        Average Median Income
                                                                    </td>
                                                                    <td><label className="switch left_check">
                                                                    <input type="checkbox" name="Average Median Income" onChange={this.demographicsCheckBox.bind(this)}/>
                                                                    <span className="slider round"></span>
                                                                    </label>
                                                                    </td>
                                                                </tr>
                                                                
                                                            </tbody>
                                                        </table>
                                                        </form>
                                                    </div>
                                                </li>
                                                <li className="">
                                                    <a href="javascript:void(0)" className="menu_link dropdown-toggle" data-toggle="dropdown" >TRAFFIC<span className="fa fa-caret-down pull-right"></span></a>
                                                    <div className="table-responsive dropdown-menu" >
                                                        <form>
                                                        <table className="menu-item table table-condensed table-striped table-hover m0 width330px">
                                                                <tbody>
                                                                <tr>
                                                                    <td>Traffic Volumes <span className="w100">(vehicular)</span>
                                                                    </td>
                                                                    <td>
                                                                        <label className="switch left_check">
                                                                        <input name="Traffic Volumes" type="checkbox" onChange={this.trafficCheckBox.bind(this)} />
                                                                        <span className="slider round"></span>
                                                                        </label>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        Traffic Congestion <span className="w100">(vehicular)</span>
                                                                    </td>
                                                                    <td><label className="switch left_check">
                                                                    <input name="Traffic Congestion" type="checkbox" onChange={this.trafficCheckBox.bind(this)}  />
                                                                    <span className="slider round"></span>
                                                                    </label>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        Hourly Traffic <span className="w100">(vehicular)</span>
                                                                    </td>
                                                                    <td><label className="switch left_check">
                                                                    <input name="Hourly Traffic" type="checkbox" onChange={this.trafficCheckBox.bind(this)} />
                                                                    <span className="slider round"></span>
                                                                    </label>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        Average Daily Traffic <span className="w100">(vehicular)</span>
                                                                    </td>
                                                                    <td><label className="switch left_check">
                                                                    <input type="checkbox" name="Average Daily Traffic" onChange={this.trafficCheckBox.bind(this)}  />
                                                                    <span className="slider round"></span>
                                                                    </label>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        </form>
                                                    </div>
                                                </li>
                                                <li className="mosaic_segments_li">
                                                    <a href="javascript:void(0)" className="menu_link dropdown-toggle" id="dropdownMenuButton3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">MOSAIC SEGMENTS<span className="fa fa-caret-down pull-right"></span></a>
                                                    <div className="table-responsive dropdown-menu drop_dv available-items" >
                                                        <form>
                                                        <div className="menu-item">
                                                            <div className="col-sm-6 text-center mb10">
                                                                <p>Overlay Opacity</p>
                                                                <input type="range" id="myRange" />
                                                            </div>
                                                            <div className="col-sm-6 text-center">
                                                                <p>Overlay Opacity</p>
                                                                <label className="switch">
                                                                <input type="checkbox" />
                                                                <span className="slider round" />
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div dangerouslySetInnerHTML={{__html: this.state.MS_STRING}}>
                                                        </div>
                                                        </form>
                                                    </div>
                                                </li>
                                                <li className="">
                                                    <a href="javascript:void(0)" className="avoid-clicks menu_link dropdown-toggle" id="dropdownMenuButton4" data-toggle="dropdown">COMPETITORS<span className="fa fa-caret-down pull-right"></span></a>
                                                    <div className="table-responsive dropdown-menu">
                                                    <form>
                                                        <div className="form-group ">
                                                        <label htmlFor="email">Add a Place By Brand Or Category</label>
                                                        <input type="text" className="form-control form_cntrl" id="text" placeholder="Cafe,Bank" name="text" />
                                                        </div>
                                                    
                                                        <table className="table table-condensed table-striped table-hover m0 width330px">
                                                            <thead>
                                                                <tr className="bg_blue">
                                                                    <th className="col-sm-8">Criteria</th>
                                                                    <th>All On</th>
                                                                    <th>All Off</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>
                                                                        <img src="images/img1.png" width="30px" className="dropdownimg" />
                                                                        <div className="checkbox boxx">Panera Brand
                                                                            <label><input type="checkbox" value=""/> Strict Filter</label>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <label className="switch">
                                                                        <input name="Panera Brand" type="checkbox" />
                                                                        <span className="slider round"></span>
                                                                        </label>
                                                                    </td>
                                                                    <td><i className="fa fa-times"></i></td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <img src="images/img1.png" width="30px" className="dropdownimg" />
                                                                        <div className="checkbox boxx">Panera Brand
                                                                            <label><input type="checkbox" /> Strict Filter</label>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <label className="switch">
                                                                        <input type="checkbox" />
                                                                        <span className="slider round"></span>
                                                                        </label>
                                                                    </td>
                                                                    <td><i className="fa fa-times"></i></td>
                                                                </tr>
                                                                <tr>
                                                                    <td><img src="images/img1.png" width="30px" className="dropdownimg" />
                                                                        <div className="checkbox boxx">Panera Brand
                                                                            <label><input type="checkbox" value="" /> Strict Filter</label>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <label className="switch">
                                                                        <input type="checkbox" />
                                                                        <span className="slider round"></span>
                                                                        </label>
                                                                    </td>
                                                                    <td><i className="fa fa-times"></i></td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <img src="images/img1.png" width="30px" className="dropdownimg"/>
                                                                        <div className="checkbox boxx">Panera Brand
                                                                            <label><input type="checkbox" /> Strict Filter</label>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <label className="switch">
                                                                        <input type="checkbox" value=""/>
                                                                        <span className="slider round"></span>
                                                                        </label>
                                                                    </td>
                                                                    <td><i className="fa fa-times"></i></td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </form>
                                                    <div>
                                                </div></div>
                                                </li>
                                                <li>
                                                    <a className="avoid-clicks nav-link dropdown-toggle" data-toggle="dropdown" href="javascript:void(0)" role="button" aria-haspopup="true" aria-expanded="false">Social</a>
                                                </li>
                                                <li>
                                                    <a className="avoid-clicks nav-link dropdown-toggle" data-toggle="dropdown" href="javascript:void(0)" role="button" aria-haspopup="true" aria-expanded="false">Business</a>
                                                </li>
                                                <li>
                                                    <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="javascript:void(0)" role="button" aria-haspopup="true" aria-expanded="false" onClick={this.toggleHeader}>&nbsp;<img id="showhideheader" onClick={this.showFullMap} src={process.env.PUBLIC_URL + "/images/fullscreen.png"} /></a>
                                                </li>
                                            </ul>
                                            <div className="tab-content">
                                                <div className="tab-pane active fade in" id="tab_default_1">
                                                    <div className="map_inner_dv">
                                                        <MapContainer getRedius={this.getRedius.bind(this)} callbackFromParent={this.callbackMapData.bind(this)}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </div>
    );
  }
}



export default Comparison2;

