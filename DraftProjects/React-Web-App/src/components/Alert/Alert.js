import React, {memo} from 'react';
import PropTypes from 'prop-types';
import './Alert.scss';

const Alert = ({type, text}) => <div className={"alert alert-" + type} role="alert">{text}</div>

Alert.propTypes = {
    type: PropTypes.string,
    text: PropTypes.string,
}

export default memo(Alert);