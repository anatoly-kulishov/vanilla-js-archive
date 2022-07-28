import React, {memo, useEffect} from 'react';
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import ErrorBoundary from "../../components/ErrorBoundary";
import LinkBack from "../../components/LinkBack";
import CreateOrderForm from "./CreateOrderForm";
import {resetCreatedStatusOrder} from "../../store/actions/ordersActions";
import {getOrderCreatedStatus, getOrdersAlert} from "../../store/selectors/orders-selectors";
import {getAllCostCenters} from "../../store/selectors/cost-centers-selectors";

const NewOrder = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const costCenters = useSelector(getAllCostCenters);
    const orderCreatedStatus = useSelector(getOrderCreatedStatus);
    const alert = useSelector(getOrdersAlert);

    useEffect(() => {
        if (orderCreatedStatus) history.goBack();
        return () => dispatch(resetCreatedStatusOrder())
    }, [dispatch, orderCreatedStatus, history])

    useEffect(() => {
        localStorage.clear();
        return () => localStorage.clear();
    }, [])

    return (
        <ErrorBoundary>
            <div className="app-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <LinkBack title="Back to Event listing"/>
                            <h1 className="title mt-3 mb-4">Create new order</h1>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="d-flex align-items-center justify-content-md-end mb-3 mb-md-0">
                                {alert &&
                                <div className={`alert alert-${alert.status}`} role="alert">{alert.text}</div>}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 mb-4">
                            <CreateOrderForm costCenters={costCenters}/>
                        </div>
                    </div>
                </div>
            </div>
        </ErrorBoundary>
    )
}

export default memo(NewOrder);
