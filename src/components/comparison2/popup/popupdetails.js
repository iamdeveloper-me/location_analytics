import React, { Component } from 'react';
import MosaicSegment from '../demographics/mosaicsegment';
import PerCapitalIncome from '../demographics/percapitaincome';
import Population from '../demographics/population';
import PopulationGrowth from '../demographics/populationgrowth';
import PopulationDensity from '../demographics/populationdensity';


class PopupDetail extends Component{
  
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
                        <MosaicSegment />
                        <PerCapitalIncome />
                        <Population />
                        <PopulationGrowth />
                        <PopulationDensity />

                    </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default PopupDetail;