import React from "react";

class Footer extends React.Component {
  render() {
    return (
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-6 col-xs-6 links-col copy-col">
              <h2>Simple Logo</h2>
              <p>Copyright Statement</p>
              <p><a href="/">Privacy Policy</a> & <a href="/">Terms of Use</a></p>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6 links-col">
              <h2>PROGRAMS</h2>
              <a href="/">Dashboard App</a>
              <a href="/">Dashboard App</a>
              <a href="/">Dashboard App</a>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6 links-col">
              <h2>ABOUT</h2>
              <a href="/">About Us</a>
              <a href="/">Contact</a>
              <a href="/">Help</a>
            </div>
            <div className="col-lg-2 col-md-2 col-sm-6 col-xs-6 links-col">
              <h2>SOCIAL</h2>
              <a href="/">Facebook</a>
              <a href="/">Twitter</a>
              <a href="/">Instragram</a>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
export default Footer;