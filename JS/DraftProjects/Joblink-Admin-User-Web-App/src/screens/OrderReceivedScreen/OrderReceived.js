import React, {useEffect, memo, useMemo} from 'react';
import Unprocessed from "./OfferStatement/Unprocessed";
import Default from "./OfferStatement/Default";
import Failed from "./OfferStatement/Failed";
import Canceled from "./OfferStatement/Canceled";
import Filled from "./OfferStatement/Filled";
import Open from "./OfferStatement/Open";
import LogWaitingEmployee from "./OfferStatement/LogWaitingEmployee";
import LogWaitingCustomer from "./OfferStatement/LogWaitingCustomer";
import Completed from "./OfferStatement/Completed";

const checkOrderStatus = (props, orderId) => {
    switch (props.order.status) {
        case 'unprocessed': {
            return <Unprocessed data={{...props, orderId}}/>
        }
        case 'open': {
            return <Open data={{...props, orderId}}/>
        }
        case 'failed': {
            return <Failed data={{...props, orderId}}/>
        }
        case 'canceled': {
            return <Canceled data={{...props, orderId}}/>
        }
        case 'filled': {
            if (props.order.phase === 'log') {
                if (props.order.JobLog.phase === 'Employee') {
                    return <LogWaitingEmployee data={{...props, orderId}}/>
                } else {
                    return <LogWaitingCustomer data={{...props, orderId}}/>
                }
            }
            return <Filled data={{...props, orderId}}/>
        }
        case 'completed': {
            return <Completed data={{...props, orderId}}/>
        }
        default: {
            return <Default data={{...props, orderId}}/>
        }
    }
}

const OrderReceived = props => {
    const {
        match,
        getOneJobEvent,
        order,
        fetchedOrders,
        fetchEmployees,
        getOneJobRoleById,
    } = props;

    const orderId = match.params.orderId;
    const JobRoleId = order?.JobRole?.id;

    useEffect(() => {
        getOneJobEvent(orderId)
    }, [getOneJobEvent, fetchedOrders, orderId])

    useEffect(() => {
        if (order.phase === 'offer') fetchEmployees(orderId);
    }, [fetchEmployees, order.phase, orderId])

    useEffect(() => {
        if (JobRoleId) getOneJobRoleById(JobRoleId);
    }, [getOneJobRoleById, JobRoleId])

    return (
        <div className="app-content">
            <div className="container-fluid">
                {useMemo(() => checkOrderStatus(props, orderId), [props, orderId])}
            </div>
        </div>
    )
}

export default memo(OrderReceived);
