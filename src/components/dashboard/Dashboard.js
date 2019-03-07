import React from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import  Header  from '../header/Header';
import Footer  from '../footer/Footer';

class Dashboard extends React.Component {
  constructor(props){
    super(props);
    console.log("jjjjjjjjjjjjjjjjjj", props)
  }

  handleIconClick(e){
    e.preventDefault();
    alert("Coming Soon! This section will get launched soon. Till then please wait.")
  }

  render() {
    return (
    <div>
      <Header/>
      <section className="apps-section">
        <div className="container">
          <div className="row">
            {/* <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 heading-col">
                <h1>Apps</h1>
            </div> */}
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 apps-link-col">
              <div className="avoid-clicks apps-link-div">
                <span onClick={this.handleIconClick}>
                    <div className="image-div">
                        <img src={window.staticurl + "/images/icon-store-pos.png"} alt="Store POS Icon" />
                    </div>
                    <div className="text-div">
                        <h2>Store POS</h2>
                    </div>
                </span>
              </div>
              <div className="avoid-clicks apps-link-div">
                <span  onClick={this.handleIconClick}>
                    <div className="image-div">
                        <img src={window.staticurl + "/images/icon-employees.png"} alt="Employees Icon" />
                    </div>
                    <div className="text-div">
                        <h2>Employees</h2>
                    </div>
                </span>
              </div>
              <div className="avoid-clicks apps-link-div">
                <span  onClick={this.handleIconClick}>
                    <div className="image-div">
                        <img src={window.staticurl + "/images/icon-inventory.png"} alt="Inventory Icon" />
                    </div>
                    <div className="text-div">
                        <h2>INVENTORY</h2>
                    </div>
                </span>
              </div>
              <div className="avoid-clicks apps-link-div">
                <span  onClick={this.handleIconClick}>
                    <div className="image-div">
                        <img src={window.staticurl + "/images/icon-marketing.png"} alt="Marketing Icon" />
                    </div>
                    <div className="text-div">
                        <h2>MARKETING</h2>
                    </div>
                </span>
              </div>
              <div className="avoid-clicks apps-link-div">
                <span  onClick={this.handleIconClick}>
                  <div className="image-div">
                      <img src={window.staticurl + "/images/icon-crm.png"} alt="CRM Icon" />
                  </div>
                  <div className="text-div">
                      <h2>CRM</h2>
                  </div>
                </span>
              </div>
              <div className="avoid-clicks apps-link-div">
                <span  onClick={this.handleIconClick}>
                  <div className="image-div">
                      <img src={window.staticurl + "/images/icon-financial.png"} alt="Financial Icon" />
                  </div>
                  <div className="text-div">
                      <h2>FINANCIAL</h2>
                  </div>
                </span>
              </div>
              {/*<div className="apps-link-div">
                <Link to='/comparision'>
                    <div className="image-div">
                        <img src={window.staticurl + "/images/icon-location-analytics.png"} alt="LOCATION ANALYTICS Icon" />
                    </div>
                    <div className="text-div">
                        <h2>LOCATION ANALYTICS</h2>
                    </div>
                </Link>
              </div>*/}
              <div className="apps-link-div">
                <Link to='/comparision2'>
                    <div className="image-div">
                      <img src={window.staticurl + "/images/icon-location-analytics.png"} alt="LOCATION ANALYTICS Icon" />
                    </div>
                    <div className="text-div">
                        <h2>LOCATION ANALYTICS</h2>
                    </div>
                </Link>
              </div>
              <div className="avoid-clicks apps-link-div">
                <span  onClick={this.handleIconClick}>
                  <div className="image-div">
                    <img src={window.staticurl + "/images/icon-user.png"} alt="USER ADMINISTRATION Icon" />
                  </div>
                  <div className="text-div">
                    <h2>USER ADMINISTRATION</h2>
                  </div>
                </span>
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

const mapStateToProps = (state) => {
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>: ',state)
    return {
      varifyUser: state.users
    }
}

export default connect(mapStateToProps, {})(Dashboard);
