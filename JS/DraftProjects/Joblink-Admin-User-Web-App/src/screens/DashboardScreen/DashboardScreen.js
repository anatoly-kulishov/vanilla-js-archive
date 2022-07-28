import React, {useMemo, useState} from 'react';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {PieChart} from 'react-minimal-pie-chart';
import ErrorBoundary from "../../components/ErrorBoundary";
import Orders from "../../components/Orders";
import Card from "../../components/Card";
import Legends from "../../components/Legend";
import {getOrders} from "../../store/selectors/orders-selectors";
import {currentEventsSelectOptions, performanceSelectOptions} from "./data";
import {filterByDate} from "../../utils/helpers/object-helpers";
import {PieChartBgColor} from "../../theme";

const DashboardScreen = () => {
    // Selectors
    const fetchedOrders = useSelector(getOrders);

    // States
    const [currentEventsFilter, setCurrentEventsFilter] = useState(currentEventsSelectOptions[0]);
    const [performanceFilter, setPerformanceFilter] = useState(performanceSelectOptions[0]);

    // Filter for getting statistics
    const unprocessedOrdersLength = useMemo(() => filterByDate(fetchedOrders, currentEventsFilter.value), [fetchedOrders, currentEventsFilter])
        .filter(event => {
            return event.status === 'unprocessed' && event.phase === 'order'
        }).length;

    const openOrdersLength = useMemo(() => filterByDate(fetchedOrders, currentEventsFilter.value), [fetchedOrders, currentEventsFilter])
        .filter(event => {
            return event.status === 'open' && event.phase === 'offer'
        }).length;

    const canceledLength = useMemo(() => filterByDate(fetchedOrders, currentEventsFilter.value), [fetchedOrders, currentEventsFilter])
        .filter(event => {
            return event.status === 'canceled'
        }).length;

    const filledOrdersLength = useMemo(() => filterByDate(fetchedOrders, currentEventsFilter.value), [fetchedOrders, currentEventsFilter])
        .filter(event => {
            return event.status === 'filled' && event.phase === 'offer'
        }).length;

    const failedOrdersLength = useMemo(() => filterByDate(fetchedOrders, currentEventsFilter.value), [fetchedOrders, currentEventsFilter])
        .filter(event => {
            return event.status === 'failed'
        }).length;

    const filledOrdersWithDateFilterLength = useMemo(() => filterByDate(fetchedOrders, performanceFilter.value), [fetchedOrders, performanceFilter.value])
        .filter(event => {
            return event.status === 'filled' && event.phase === 'offer'
        }).length;

    const failedOrdersWithDateFilterLength = useMemo(() => filterByDate(fetchedOrders, performanceFilter.value), [fetchedOrders, performanceFilter.value])
        .filter(event => {
            return event.status === 'failed'
        }).length;

    const jobLogMissingLength = useMemo(() => filterByDate(fetchedOrders, performanceFilter.value), [fetchedOrders, performanceFilter.value])
        .filter(event => {
            return event.phase === 'log' && event.JobLog.phase === 'Employee'
        }).length;

    const jobLogInProgressLength = useMemo(() => filterByDate(fetchedOrders, performanceFilter.value), [fetchedOrders, performanceFilter.value])
        .filter(event => {
            return event.phase === 'log' && event.JobLog.phase !== "Employee" && event.JobLog.phase !== "finalized"
        }).length;

    const units1 = [
        {
            title: 'Unprocessed',
            value: unprocessedOrdersLength,
            color: "#FACC15"
        },
        {
            title: 'Open',
            value: openOrdersLength,
            color: "#818CF8"
        },
        {
            title: 'Filled',
            value: filledOrdersLength,
            color: "#4ADE80"
        },
        {
            title: 'Failed',
            value: failedOrdersLength,
            color: "#F87171"
        },
        {
            title: 'Canceled',
            value: canceledLength,
            color: "#FB923C"
        },
    ];

    const units2 = [
        {
            title: 'Filled',
            value: filledOrdersWithDateFilterLength,
            color: "#4ADE80"
        },
        {
            title: 'Job Log Missing',
            value: jobLogMissingLength,
            color: "#FACC15"
        },
        {
            title: 'Job Log in Progress',
            value: jobLogInProgressLength,
            color: "#818CF8"
        },
        {
            title: 'Failed',
            value: failedOrdersWithDateFilterLength,
            color: "#F87171"
        },
    ]

    return (
        <ErrorBoundary>
            <div className="app-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <h1 className="title">Dashboard</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-xl-4 mb-5 mb-lg-4">
                            <Card title="Unprocessed">
                                <div className="card-body">
                                    <Orders/>
                                </div>
                                <div className="card-footer">
                                    <div className="btn-group">
                                        <Link className="btn btn--light-green btn--block"
                                              to="/event-listing">Show all
                                        </Link>
                                        <Link className="btn btn--light-green btn--block"
                                              to="/new-order">Create new
                                        </Link>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <div className="col-12 col-xl-4 mb-5 mb-lg-4">
                            <Card title="Current events"
                                  selectFilterState={currentEventsFilter}
                                  setSelectFilterState={setCurrentEventsFilter}
                                  selectOptions={currentEventsSelectOptions}>
                                <div className="card-body">
                                    <div className="graphic">
                                        <PieChart data={units1}
                                                  lineWidth={50}
                                                  background={PieChartBgColor}
                                                  animate={true}/>
                                        <div className="custom-chart">
                                            <b className="custom-chart__count">{fetchedOrders.length}</b>
                                            <span className="custom-chart__desc">events</span>
                                        </div>
                                    </div>
                                    <Legends units={units1}/>
                                </div>
                                <div className="card-footer">
                                    <Link className="btn btn--light-green btn--block"
                                          to="/event-listing">Show all
                                    </Link>
                                </div>
                            </Card>
                        </div>
                        <div className="col-12 col-xl-4 mb-5 mb-lg-4">
                            <Card title="Performance"
                                  selectFilterState={performanceFilter}
                                  setSelectFilterState={setPerformanceFilter}
                                  selectOptions={performanceSelectOptions}>
                                <div className="card-body">
                                    <div className="graphic">
                                        <PieChart data={units2}
                                                  lineWidth={50}
                                                  background={PieChartBgColor}
                                                  animate={true}/>
                                        <div className="custom-chart">
                                            <b className="custom-chart__count">{fetchedOrders.length}</b>
                                            <span className="custom-chart__desc">events</span>
                                        </div>
                                    </div>
                                    <Legends units={units2}/>
                                </div>
                                <div className="card-footer">
                                    <Link className="btn btn--light-green btn--block"
                                          to="/event-listing">Show all
                                    </Link>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </ErrorBoundary>
    )
}

export default DashboardScreen;
