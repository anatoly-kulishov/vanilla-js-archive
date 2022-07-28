import React from "react";

const LocationsLegend = props => {
    const {dataList, costCenters} = props;
    const {name, JobRoles, CostCenterId} = dataList;
    const costCentersName = costCenters.filter(costCenter => costCenter.id === CostCenterId)?.[0]?.name;
    return (
        <div className="locations">
            <div className="locations__head locations-box">
                <div className="locations__title mb-1">{name}</div>
                <div>{costCentersName}</div>
            </div>
            <ul className="locations-list">
                {JobRoles.map(el => <li className="locations-box bg-white" key={el.id}>{el.name}</li>)}
            </ul>
        </div>
    );
}

export default LocationsLegend;
