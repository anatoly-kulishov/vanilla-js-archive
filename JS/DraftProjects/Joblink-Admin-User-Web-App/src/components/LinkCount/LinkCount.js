import React from "react";
import PropTypes from 'prop-types';
import './LinkCount.scss';

const LinkCount = props => {
    const {name, count} = props;
    return (
        <div className="link-count">
            {name}<span className="count">{count}</span>
        </div>
    );
}

LinkCount.propTypes = {
    name: PropTypes.string,
    count: PropTypes.number
}

export default LinkCount;