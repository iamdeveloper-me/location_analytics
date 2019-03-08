import React, { Component } from 'react';

class MosaicSegment extends Component{
    render(){
        return(
        <div className="row" id="Demographics_first">
            <div className="col-md-12">
                <ul className="list-group list-unstyled">
                    <li className="col-md-4"><label className="ptext"><input type="checkbox" /> Power Elite </label></li>
                    <li className="col-md-4"><label className="ptext"><input type="checkbox" /> Flourishing Families </label></li>
                    <li className="col-md-4"><label className="ptext"><input type="checkbox" /> Booming with Confidence </label></li>
                    <li className="col-md-4"><label className="ptext"><input type="checkbox" /> Suburban Style </label></li>
                    <li className="col-md-4"><label className="ptext"><input type="checkbox" /> Thriving Boomers </label></li>
                </ul>
                <hr/>
            </div>  
            <div className="col-md-12">
                <ul className="list-group list-unstyled">
                    <li className="col-md-4"><label className="ptext"><input type="checkbox" /> Economic Challenges </label></li>
                    <li className="col-md-4"><label className="ptext"><input type="checkbox" /> Aspirational Fusion </label></li>
                    <li className="col-md-4"><label className="ptext"><input type="checkbox" /> Golden Year Guardians </label></li>
                    <li className="col-md-4"><label className="ptext"><input type="checkbox" /> Cultural Connections </label></li>
                </ul>
                <hr/>
            </div>  
            <div className="col-md-12">
                <ul className="list-group list-unstyled">
                    <li className="col-md-4"><label className="ptext"><input type="checkbox" /> Singles and Starters </label></li>
                </ul>
                <hr/>
            </div>                                         
         </div>
    )
    }
}

export default MosaicSegment;
