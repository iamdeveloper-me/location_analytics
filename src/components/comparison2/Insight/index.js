import React, { Component } from 'react';

class Insight extends React.Component {
    constructor(props) {
        super(props);

    }
    render(){
        return(
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
        )
    }
}

export default Insight;
