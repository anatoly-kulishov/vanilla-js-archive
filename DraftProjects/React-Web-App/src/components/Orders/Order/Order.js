import React, {memo} from 'react';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import moment from "moment";

const Order = props => {
    const {order} = props;
    return (
        <li key={order.id}>
            <Link to={`/event-listing/${order.id}`}>
                <div className="d-flex justify-content-between align-items-center">
                    <span className="job-row">
                        <span className="job-title">{order.JobRole.Location.name}</span>
                    </span>
                    <span className="job-date">{moment(order.createdAt).endOf('minute').fromNow()}</span>
                </div>
                <div className="job-desc">
                    {moment(order.start).format('LT')} - {moment(order.end).format('LT')}
                </div>
                <div className="job-role">
                    {order.JobRole.name}
                </div>
            </Link>
        </li>
    )
}

Order.propTypes = {
    order: PropTypes.object
}

export default memo(Order);
