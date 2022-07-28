import React from "react";
import {useHistory} from "react-router-dom";
import PropTypes from 'prop-types';
import './LinkBack.scss';

const LinkBack = props => {
    const {title} = props;
    const  history = useHistory();
    return (
        <div className="link-back">
            <span className="link-back-icon" onClick={history.goBack}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
                    <g stroke="#a1a1aa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 11.996h12"/>
                        <path d="M12 18l-6-6 6-6"/>
                    </g>
                    <defs/>
                </svg>
            </span>
            <span className="link-back__title" onClick={history.goBack}>{title}</span>
        </div>
    );
}

LinkBack.propTypes = {
    title: PropTypes.string,
    to: PropTypes.string
}

export default LinkBack;
