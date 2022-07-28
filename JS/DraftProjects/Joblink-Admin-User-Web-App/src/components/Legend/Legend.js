import React from 'react';
import PropTypes from 'prop-types';
import Unit from "./Unit/Unit";
import './Legend.scss';

const Legends = props => {
    const {units} = props;
    return (
        <div className="legend">
            <ul className="caption-list">
                {units.map((unit, num) => <Unit key={num} data={unit}/>)}
            </ul>
        </div>
    )
}

Legends.propTypes = {
    units: PropTypes.array
}

export default Legends;
