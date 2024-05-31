import React from 'react';
import DetailAnnonce from './DetailAnnonce';


const ConstructAnnonce = ({liste}) => {

  return (
    <div className="favourite-place place-padding">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="section-tittle text-center">
                            <span>FEATURED ANNOUNCEMENT</span>
                            <h2>Favourite cars</h2>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {liste.map((user) => (
                        <DetailAnnonce user={user} />
                    ))}
                </div>
            </div>
    </div>
)};

export default ConstructAnnonce;
