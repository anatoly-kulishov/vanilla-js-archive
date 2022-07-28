import React, {memo} from 'react';
import PropTypes from 'prop-types';
import './Badge.scss';

const Badge = props => {
    const {status, children} = props;
    return <span className={`badge badge-${(status) ? 'success' : 'warning'}`}>{children}</span>
}

Badge.propTypes = {
    title: PropTypes.string,
    status: PropTypes.any
}

export default memo(Badge);
