import React from "react";

class Header extends React.Component {
  render() {
    return (
      <header>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 col-md-3 col-sm-4 col-xs-6 logo-col">
                <a href="index.html"> <img src={window.staticurl + '/images/logo.svg'} alt="Logo" /> </a>
            </div>
            <div className="col-lg-5 col-md-5 col-sm-4 hidden-xs heading-col">
                {/* <label>Dashboard</label> */}
            </div>
            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-6 profile-col">
              <div className="profile-div">
                <div className="btn-group" role="group">
                  <p>J</p>
                  <button type="button" className="avoid-clicks btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">John <i className="fa fa-chevron-down"></i></button>
                  {/* <ul className="dropdown-menu">
                      <li><a href="/">Dropdown link</a></li>
                      <li><a href="/">Dropdown link</a></li>
                  </ul> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}
export default Header;   