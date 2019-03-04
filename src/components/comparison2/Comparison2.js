import React, { Component } from 'react';
import Footer  from '../footer/Footer';
import { connect } from 'react-redux';
import { getLocation, getAddress, showHeader, hideHeader } from "../../actions/Comparison2Creator.js"
import PopupDetail from './popup/popupdetails.js';
import MapContainer from './map/mapContainer.js';

class Comparison2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "", 
      multi_place:[], 
      latitude:"41.850033", 
      longitude:"-87.6500523",
      jsonDataLocation:"", 
      jsonDataAddress:"", 
      cardViewData:[], 
      MS_STRING:""
    };
  }

  getLocation(){
    this.geolocServ.getLocation(this.state.address).then( result => {
      let state = this.state;
      state.jsonDataLocation = JSON.stringify(result.data);
      state.latitude = result
      .data.data.latitude;
      state.longitude = result.data.data.longitude;
      state.boundary = result.data.data.postalcodeboundary;
      this.setState(state);
    });
  }

  getAddress(e){
    this.geolocServ.getAddress(this.state.latitude, this.state.longitude).then( result => {
      let state = this.state;
      state.jsonDataAddress = JSON.stringify(result.data);
      state.address = result.data.data.label;
      state.boundary = result.data.data.postalcodeboundary;
      this.setState(state);
    });
  }

  showHeader(){
    window.jQuery("#viewSelectDiv").show();
    window.jQuery("header").show();
    window.jQuery(".map_inner_dv,#map").css("height","500px");
    window.jQuery(".tabbable-panel").css("padding","0 20px");
    window.jQuery("#contentColCheck").css("padding","20px 30px");
  }

  hideHeader(){
    window.jQuery("#viewSelectDiv").hide();
    window.jQuery("header").hide();
    window.jQuery(".map_inner_dv,#map").css("height",(window.innerHeight - 50) + "px");
    window.jQuery(".tabbable-panel").css("padding","0");
    window.jQuery("#contentColCheck").css("padding","0px");
  }

  render() {
    let cardViewDatas = []
    if (this.state.cardViewData != "") {
      cardViewDatas = this.state.cardViewData[0].dataCols
    }
    let col_class = (this.state.cardViewData.length > 0) ? (12 / this.state.cardViewData.length) : 12;
    return (
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
                          {this.state.cardViewData.length < 2 ? 
                      <div className="col-md- col-sm-12 content-card-col">
                          <h2 className="select_address">Please select at least 2 addresses from Map View</h2>
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
                                              <a href="javascript:void(0)"  className="menu_link dropdown-toggle" data-toggle="dropdown" > DEMOGRAPHICS<span className="fa fa-caret-down pull-right"></span></a>
                                              <div className="table-responsive dropdown-menu test123" onClick={this.showModal.bind(this)} >
                                              <form>
                                              <table className="table table-condensed menu-item table-striped table-hover m0 width330px">
                                                  <thead>
                                                      <tr className="bg_blue">
                                                          <th className="col-sm-12">Criteria</th>
                                                          <th className="text-center">Visibility</th>
                                                      </tr>
                                                  </thead>
                                                  <tbody>
                                                  {cardViewDatas.length > 0 && cardViewDatas.map((col, j) => {
                                                      if(j<=12){     
                                                          return (
                                                              <tr key={j}>
                                                              <td>{col.title}</td>
                                                              <td><label className="switch">
                                                              <input type="checkbox"  />
                                                              <span className="slider round"></span>
                                                              </label>
                                                              </td>
                                                              </tr>
                                                          )
                                                      }
                                                      else{
                                                          return("");
                                                      }
                                                      }
                                                      )}
                                                      
                                                      
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
                                                                  <input type="checkbox" />
                                                                  <span className="slider round"></span>
                                                                  </label>
                                                              </td>
                                                          </tr>
                                                          <tr>
                                                              <td>
                                                                  Traffic Congestion <span className="w100">(vehicular)</span>
                                                              </td>
                                                              <td><label className="switch left_check">
                                                              <input type="checkbox" />
                                                              <span className="slider round"></span>
                                                              </label>
                                                              </td>
                                                          </tr>
                                                          <tr>
                                                              <td>
                                                                  Hourly Traffic <span className="w100">(vehicular)</span>
                                                              </td>
                                                              <td><label className="switch left_check">
                                                              <input type="checkbox" />
                                                              <span className="slider round"></span>
                                                              </label>
                                                              </td>
                                                          </tr>
                                                          <tr>
                                                              <td>
                                                                  Average Daily Traffic <span className="w100">(vehicular)</span>
                                                              </td>
                                                              <td><label className="switch left_check">
                                                              <input type="checkbox" />
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
                                                                  <input type="checkbox" />
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
                                                  <MapContainer callbackFromParent={this.callbackMapData.bind(this)}/>
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
        <PopupDetail />
      </div>
    );
  }

}


const mapStateToProps = state => {
  return {
      state
  }
}

export default connect(mapStateToProps, { getLocation, getAddress, showHeader, hideHeader })(Comparison2);

