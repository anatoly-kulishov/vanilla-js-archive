import React, {useEffect, useMemo, useState} from 'react';
import {NavLink, useRouteMatch} from "react-router-dom";
import Select from "react-select";
import moment from "moment";
import {SEARCH_ORDERS} from "../../store/types";
import {theadData, filterOptions} from "./data";
import {selectTheme} from "../../theme";
import ErrorBoundary from "../../components/ErrorBoundary";
import SearchPanel from "../../components/SearchPanel";
import NoResultInTable from "../../components/NoResultInTable";
import Badge from "../../components/Badge";
import Pagination from "../../components/Pagination";
import Spinner from "../../components/Spinner";
import {useDispatch, useSelector} from "react-redux";
import {getOrders, getOrdersLoadingStatus, getOrdersTerm} from "../../store/selectors/orders-selectors";
import {getAllCostCenters} from "../../store/selectors/cost-centers-selectors";
import {searchByJobRole} from "../../store/actions/appActions";
import {filterByCostCenter, filterByStatus} from "../../utils/helpers/object-helpers";

const EventListing = () => {
    const dispatch = useDispatch();
    const {url} = useRouteMatch();

    const term = useSelector(getOrdersTerm);
    const events = useSelector(getOrders);
    const costCenters = useSelector(getAllCostCenters);
    const isLoading = useSelector(getOrdersLoadingStatus);

    const [costCentersOptions, setCostCentersOptions] = useState(null)
    const [costCenterName, setCostCenterName] = useState({value: 0, label: "All Cost centers"});
    const [statusFilter, setStatusFilter] = useState({value: 'all', label: 'Show all'});
    // const [selectedOption3, setSelectedOption3] = useState(null);

    useEffect(() => {
        setCostCentersOptions(costCenters.map(el => ({value: el?.id, label: el?.name})))
        setCostCentersOptions(prev => [{value: 0, label: "All Cost centers"}, ...prev])
    }, [costCenters])

    const handleCostCenterNameChange = selectedOption => setCostCenterName(selectedOption);
    const handleStatusFilterChange = selectedOption => setStatusFilter(selectedOption);
    // const handleChange3 = selectedOption => setSelectedOption3(selectedOption);

    const visibleItem = useMemo(() => filterByCostCenter(filterByStatus(dispatch(searchByJobRole(events, term)), statusFilter?.value), costCenterName?.value), [events, term, statusFilter.value, costCenterName.value, dispatch]);

    return (
        <ErrorBoundary>
            <div className="app-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 col-lg-6">
                            <h1 className="title">Event listing ({visibleItem.length})</h1>
                        </div>
                        <div className="col-12 col-lg-6">
                            <div className="btn-group justify-content-md-end">
                                <NavLink className="btn btn--green mr-2" to="/new-order">
                                    Create Job Order
                                </NavLink>
                                <NavLink className="btn btn--light-green btn--disabled" to="/job-logs-processing">
                                    Job logs processing
                                </NavLink>
                            </div>
                        </div>
                        <div className="col-12 mt-4 mt-lg-0 mb-4 mb-md-2 mb-lg-4">
                            <div className="filters d-md-flex align-items-end">
                                <div className="filters__body">
                                    <div className="select-box">
                                        <label>
                                            <span>Cost center name</span>
                                            <Select
                                                value={costCenterName}
                                                onChange={handleCostCenterNameChange}
                                                options={costCentersOptions}
                                                theme={selectTheme}/>
                                        </label>
                                    </div>
                                    <div className="select-box">
                                        <label>
                                            <span>Status</span>
                                            <Select value={statusFilter}
                                                    onChange={handleStatusFilterChange}
                                                    options={filterOptions}
                                                    theme={selectTheme}/>
                                        </label>
                                    </div>
                                    {/*<div className="select-box d-none">*/}
                                    {/*    <label>*/}
                                    {/*        <span>Timeframe</span>*/}
                                    {/*        <Select value={selectedOption3}*/}
                                    {/*                onChange={handleChange3}*/}
                                    {/*                options={mockOptions}*/}
                                    {/*                theme={selectTheme}/>*/}
                                    {/*    </label>*/}
                                    {/*</div>*/}
                                </div>
                                <div className="filter-group ml-3">
                                    <div className="search">
                                        <SearchPanel type={SEARCH_ORDERS}
                                                     selector={state => state.orders.term}
                                                     placeholder="Search..."/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <table className="table">
                                <thead>
                                <tr>
                                    {theadData.map(el => <th key={el}>{el}</th>)}
                                </tr>
                                </thead>
                                <tbody>
                                {isLoading
                                    ? (
                                        <tr>
                                            <td className="h-15" colSpan={theadData.length}><Spinner/></td>
                                        </tr>
                                    ) : ((visibleItem.length) ? visibleItem.map(el => (
                                        <tr key={el.id}>
                                            <td className="link-in text-bold">
                                                <NavLink to={`${url}/${el.id}`}>
                                                    {(!!el.lockedAt) && <span className="locked-icon"/>}
                                                    {moment(el.start).format('D MMMM hh:mm a')}
                                                </NavLink>
                                            </td>
                                            <td className="link-in">
                                                <NavLink to={`${url}/${el.id}`}>
                                                    {moment(moment(el?.end) - moment(el?.start)).utc().format('H')}
                                                </NavLink>
                                            </td>
                                            <td className="link-in">
                                                <NavLink to={`${url}/${el.id}`}>
                                                    {el.JobRole.Location.CompanyAccount.name}
                                                </NavLink>
                                            </td>
                                            <td className="link-in">
                                                <NavLink to={`${url}/${el.id}`}>
                                                    {el.JobRole.name}
                                                </NavLink>
                                            </td>
                                            <td className="link-in">
                                                <NavLink to={`${url}/${el.id}`}>
                                                    {el.status}
                                                </NavLink>
                                            </td>
                                            {
                                                el?.phase === 'order' &&
                                                <td className="badge-box">
                                                    <Badge status={true}>Order</Badge>
                                                    <Badge status={false}>Offer</Badge>
                                                    <Badge status={false}>Logs</Badge>
                                                </td>
                                            }
                                            {
                                                el?.phase === 'offer' &&
                                                <td className="badge-box">
                                                    <Badge status={true}>Order</Badge>
                                                    <Badge status={true}>Offer</Badge>
                                                    <Badge status={false}>Logs</Badge>
                                                </td>
                                            }
                                            {
                                                el?.phase === 'log' &&
                                                <td className="badge-box">
                                                    <Badge status={true}>Order</Badge>
                                                    <Badge status={true}>Offer</Badge>
                                                    <Badge status={true}>Logs</Badge>
                                                </td>
                                            }
                                        </tr>
                                    )) : <NoResultInTable colSpan={theadData.length}/>)
                                }
                                </tbody>
                                <tfoot>
                                <tr>
                                    <td colSpan={theadData.length}>
                                        <Pagination/>
                                    </td>
                                </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </ErrorBoundary>
    );
}

export default EventListing;
