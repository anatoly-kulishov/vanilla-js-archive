import React, {useEffect, useState} from 'react';
import Select from "react-select";
import {selectTheme} from "../../theme";
import Disfavorite from "./icons/Disfavorite";
import Pagination from "../../components/Pagination";
import ErrorBoundary from "../../components/ErrorBoundary";
import LinkBack from "../../components/LinkBack";
import Favorite from "./icons/Favorite";

const EmployeeAssignment = props => {
    const {title, potentialEmployees, sendOfferToEmployees, getAllPotentialEmployees, isLoading, history, match, costCenters} = props;
    const orderId = match?.params?.orderId;
    const theadData = ['Employee name', 'Tänään/huomenna', 'Accepted/Executed', '180d', 'Skills', 'Favorite / Disfavorite'];

    // States
    const [employeeId, setEmployeeId] = useState(null);
    const [validate, setValidate] = useState(true);
    const [costCentersOptions, setCostCentersOptions] = useState(null)
    const [costCenterName, setCostCenterName] = useState({value: "all", label: "All Cost centers"});
    const [selectedAll, setSelectedAll] = useState(false);

    // Actions
    const handleCostCenterNameChange = selectedOption => setCostCenterName(selectedOption);
    const onAssignSelectedHandler = (employeeId) => {
        if (employeeId) {
            sendOfferToEmployees(orderId, [employeeId])
            setValidate(true)
            setEmployeeId(null)
            history.goBack()
        } else {
            setValidate(false)
        }
    }

    // Side Effects
    useEffect(() => {
        getAllPotentialEmployees(orderId)
    }, [getAllPotentialEmployees, orderId])

    useEffect(() => {
        setCostCentersOptions(costCenters.map(el => ({value: el?.name, label: el?.name})))
        setCostCentersOptions(prev => [{value: "all", label: "All Cost centers"}, ...prev])
    }, [costCenters])

    return (
        <div className="app-content">
            <ErrorBoundary>
                <div className="container-fluid">
                    <div className="row mb-4">
                        <div className="col-12 col-md-12">
                            <LinkBack title="Back to Event listing"/>
                            <div className="title-box mt-3">
                                <h1 className="title mr-2">{title} ({potentialEmployees.length})</h1>
                                <button className="btn btn--green ml-4"
                                        onClick={() => onAssignSelectedHandler(employeeId)}>Assign selected
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-4 d-none">
                        <div className="col-12">
                            <div className="filters">
                                <div className="filters__body align-items-end flex-wrap flex-xl-nowrap">
                                    <div className="form-group mt-md-3 mt-xl-0">
                                        <label className="filter-box filter-box-small custom-checkbox">
                                            <input
                                                name="costCenterName"
                                                type="checkbox"/>
                                            <span>Selected Cost Center</span>
                                        </label>
                                        <div className="select-box w-auto">
                                            <label>
                                                <Select
                                                    value={costCenterName}
                                                    onChange={handleCostCenterNameChange}
                                                    options={costCentersOptions}
                                                    theme={selectTheme}/>
                                            </label>
                                        </div>
                                        <div className="mr-3">
                                            <label
                                                className="filter-box filter-box--small custom-checkbox">
                                                <input
                                                    name="onlyCustomerFavorites"
                                                    type="checkbox"/>
                                                <span>Only Customer favorites</span>
                                            </label>
                                        </div>
                                        <div className="mr-3">
                                            <label className="filter-box filter-box--small custom-checkbox">
                                                <input
                                                    name="hideEmployeeDisfavorites"
                                                    type="checkbox"/>
                                                <span>Hide Employee disfavorites</span>
                                            </label>
                                        </div>
                                        <div>
                                            <label className="filter-box filter-box--small custom-checkbox">
                                                <input
                                                    name="hideEmployeeDisfavorites"
                                                    type="checkbox"/>
                                                <span>Worked in company past 180 days</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            {!isLoading && (
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th className="table-checkbox">
                                            <label
                                                className={`custom-checkbox ${!validate && 'not-validated-checkbox'}`}>
                                                <input type="checkbox"
                                                       name="selectAll"
                                                       checked={selectedAll}
                                                       onChange={() => setSelectedAll(!selectedAll)}/><span/>
                                            </label>
                                        </th>
                                        {theadData.map(el => <th key={el}>{el}</th>)}
                                    </tr>
                                    </thead>
                                    <tbody className="bg-transparent">
                                    {(potentialEmployees.length) ? (potentialEmployees.map(employee => {
                                        return (
                                            <tr key={employee.id}>
                                                <td className="table-checkbox">
                                                    {/* Todo: Реализовать выбор нескольких работников! */}
                                                    <label
                                                        className={`custom-checkbox ${!validate && 'not-validated-checkbox'}`}>
                                                        <input name={employee.id}
                                                               type="checkbox"
                                                               onChange={() => setEmployeeId(employee.id)}/><span/>
                                                    </label>
                                                </td>
                                                <td align="center"
                                                    title={`${employee.firstName} ${employee.lastName}`}>
                                                    <b>{employee.firstName} {employee.lastName}</b><br/>
                                                    <small>{employee.address_Street}, {employee.address_City}</small>
                                                </td>
                                                <td>Mock Data</td>
                                                <td>32 / 4</td>
                                                <td>0h</td>
                                                <td className="table-skills">
                                                    {/* Todo: Реализовать нормальное сравнение, сейчас сравнивается только первый скилл из ордера! */}
                                                    {/*// .filter(skill => skill.id === currentOrder?.EventSkills[0].SkillId)*/}
                                                    {employee.Skills
                                                        .map(skill => {
                                                            return (
                                                                <span id={skill.id}
                                                                      className={'skill-box skill-box--auto skill-box--success'}
                                                                      key={skill.id}>{skill.name}</span>
                                                            )
                                                        })}
                                                </td>
                                                <td>{'TODO' ? <Favorite/> : <Disfavorite/>}</td>
                                            </tr>
                                        )
                                    })) : null}
                                    {(!potentialEmployees.length) && (
                                        <tr className="no-result">
                                            <td className="bg-warning" colSpan={++theadData.length}>
                                                Sorry, no results were found.
                                            </td>
                                        </tr>
                                    )}
                                    </tbody>
                                    {(potentialEmployees.length > 10) && (
                                        <tfoot>
                                        <tr>
                                            <td colSpan={++theadData.length}>
                                                <Pagination/>
                                            </td>
                                        </tr>
                                        </tfoot>
                                    )}
                                </table>
                            )}
                        </div>
                    </div>
                </div>
            </ErrorBoundary>
        </div>
    );
}

export default EmployeeAssignment;
