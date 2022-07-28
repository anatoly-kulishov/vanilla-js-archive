import React, {memo} from 'react';
import PropTypes from 'prop-types';

const Legends = props => {
    const {data} = props;
    return (
        <li className="caption-item">
            <span style={{background: data.color}} className="icon"/>{data.title}
            <span className="count">{data.value}</span></li>
    )
}

Legends.propTypes = {
    data: PropTypes.object
}

export default memo(Legends);
