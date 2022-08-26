import React from 'react';
import {Link, useRouteMatch} from "react-router-dom";
import PropTypes from 'prop-types';

const OldSchoolMenuLink = props => {
    const {label, to, activeOnlyWhenExact} = props;
    let match = useRouteMatch({path: to, exact: activeOnlyWhenExact});
    return (<span className={'link-box' + (match ? " active" : "")}>       {match && ""} <Link
        to={to}>{label}</Link></span>);
}

OldSchoolMenuLink.propTypes = {
    label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    to: PropTypes.string,
    activeOnlyWhenExact: PropTypes.bool,
}

export default OldSchoolMenuLink;
