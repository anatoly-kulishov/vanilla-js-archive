import React, {useEffect} from 'react';
import ErrorBoundary from "../ErrorBoundary";
import Order from "./Order";
import './Orders.scss';

const Orders = props => {
    const {fetchedOrders = [], fetchOrders} = props;

    useEffect(() => {
        fetchOrders()
    }, [fetchOrders])

    return (
        <ErrorBoundary>
            <ul className="orders-list">
                {fetchedOrders
                    .filter(order => order.status === 'unprocessed')
                    .map(order => <Order key={order.id} order={order}/>)}
            </ul>
        </ErrorBoundary>
    )
}

export default Orders;
