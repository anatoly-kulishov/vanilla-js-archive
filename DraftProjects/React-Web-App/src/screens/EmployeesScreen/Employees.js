import React, {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {NavLink, useHistory, useRouteMatch} from "react-router-dom";
import Select from "react-select";
import {employeesSelectOptions, theadData} from "./data";
import {selectTheme} from "../../theme";
import ErrorBoundary from "../../components/ErrorBoundary";
import SearchPanel from "../../components/SearchPanel";
import Spinner from "../../components/Spinner";
import Pagination from "../../components/Pagination";
import NoResultInTable from "../../components/NoResultInTable";
import InviteModal from "./InviteModal";
import {getAllEmployees} from "../../store/actions/employeesActions";
import {getEmployees, getEmployeesLoadingStatus, getEmployeesTerm} from "../../store/selectors/employees-selectors";
import {getAllCostCenters} from "../../store/selectors/cost-centers-selectors";
import {SEARCH_EMPLOYEE} from "../../store/types";
import {searchByFirstAndLastName} from "../../store/actions/appActions";

const Employees = () => {
    // Other Hooks
    const dispatch = useDispatch();
    const {url} = useRouteMatch();
    const history = useHistory();

    // States
    const [costCentersOptions, setCostCentersOptions] = useState(null);
    const [costCenterName, setCostCenterName] = useState({value: "all", label: "All Cost centers"});
    const [employeesFilterOptions, setEmployeesFilterOptions] = useState(employeesSelectOptions);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalData, setModalData] = useState(null);

    // Selectors
    const employees = useSelector(getEmployees);
    const term = useSelector(getEmployeesTerm);
    const isLoading = useSelector(getEmployeesLoadingStatus);
    const costCenters = useSelector(getAllCostCenters);

    // Actions
    const handleCostCenterNameChange = selectedOption => setCostCenterName(selectedOption);
    const handleEmployeesFilterChange = selectedOption => setEmployeesFilterOptions(selectedOption);
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    const visibleItem = useMemo(() => searchByFirstAndLastName(employees, term), [employees, term]);

    // Side Effects
    useEffect(() => {
        setCostCentersOptions(costCenters.map(el => ({value: el?.name, label: el?.name})))
        setCostCentersOptions(prev => [{value: "all", label: "All Cost centers"}, ...prev])
    }, [costCenters])

    useEffect(() => {
        dispatch(getAllEmployees())
    }, [dispatch])

    useEffect(() => {
        setModalData(costCenters)
    }, [costCenters])

    return (
        <ErrorBoundary>
            <div className="app-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <h1 className="title d-block error-title">Employees</h1>
                        </div>
                        <div className="col-12 mt-4 mt-lg-0 mb-4 mb-md-2 mb-lg-5 d-none">
                            <div className="d-flex justify-content-between align-items-end">
                                <div className="filters d-md-flex align-items-center">
                                    <div className="filters__body">
                                        <div className="filter-group align-items-end">
                                            <div className="select-box">
                                                <label>
                                                    <Select value={costCenterName}
                                                            onChange={handleCostCenterNameChange}
                                                            options={costCentersOptions}
                                                            theme={selectTheme}/>
                                                </label>
                                            </div>
                                            <div className="select-box">
                                                <label>
                                                    <Select
                                                        value={employeesFilterOptions[0]}
                                                        onChange={handleEmployeesFilterChange}
                                                        options={employeesSelectOptions}
                                                        theme={selectTheme}/>
                                                </label>
                                            </div>
                                            <div className="search mr-3">
                                                <SearchPanel type={SEARCH_EMPLOYEE}
                                                             selector={state => state.employees.term}
                                                             placeholder="Search..."/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <button className="btn btn-md-block btn--green" onClick={() => openModal()}>
                                        Send invite
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
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
                                    ) : ((visibleItem.length) ? visibleItem.map(employee => (
                                        <tr key={employee.id}>
                                            <td className="link-in text-bold">
                                                <NavLink to={`${url}/${employee.id}`}>
                                                    {employee.firstName} {employee.lastName}
                                                    <span className="send-message-icon ml-2"
                                                          onClick={() => history.push('/messages')}>
                                                        <svg width="18" height="16" viewBox="0 0 18 16" fill="none"
                                                             xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M17.4167 14.3389C17.4152 14.5468 17.332 14.7458 17.1851 14.8929C17.0382 15.04 16.8392 15.1233 16.6313 15.125H2.36867C2.16031 15.1248 1.96056 15.0419 1.8133 14.8945C1.66605 14.7471 1.58333 14.5472 1.58333 14.3389V13.5417H15.8333V4.27917L9.5 9.97917L1.58333 2.85417V1.66667C1.58333 1.4567 1.66674 1.25534 1.81521 1.10687C1.96367 0.958407 2.16504 0.875 2.375 0.875H16.625C16.835 0.875 17.0363 0.958407 17.1848 1.10687C17.3333 1.25534 17.4167 1.4567 17.4167 1.66667V14.3389ZM3.51025 2.45833L9.5 7.84958L15.4898 2.45833H3.51025ZM0 10.375H6.33333V11.9583H0V10.375ZM0 6.41667H3.95833V8H0V6.41667Z"
                                                            fill="#22C55E"/>
                                                        </svg>
                                                    </span>
                                                </NavLink>
                                            </td>
                                            <td className="link-in">
                                                <NavLink to={`${url}/${employee.id}`}>
                                                    {employee.email}
                                                </NavLink>
                                            </td>
                                            <td className="link-in">
                                                <NavLink to={`${url}/${employee.id}`}>
                                                    {employee.phone}
                                                </NavLink>
                                            </td>
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
            <InviteModal data={modalData}
                         modalIsOpen={modalIsOpen}
                         maxWidth={680}
                         closeModal={closeModal}
                         response={null}/>
        </ErrorBoundary>
    );
}

export default Employees;
