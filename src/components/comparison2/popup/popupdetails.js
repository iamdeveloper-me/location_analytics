import React, { Component } from 'react';

class PopupDetail extends React.Component{
  render() {
    return (

      <div id="myModal" className="modal fade" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close closeModal" data-dismiss="modal">&times;</button>
              <h4 id="SetModay"><strong>Mosaic Segments</strong></h4>    
            </div>
            <div className="modal-body">

            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default PopupDetail;
