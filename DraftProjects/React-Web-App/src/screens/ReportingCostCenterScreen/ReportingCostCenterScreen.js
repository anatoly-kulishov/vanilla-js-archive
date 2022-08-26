import React, {useState, useEffect} from 'react';
import Select from 'react-select';
import PropTypes from "prop-types";
import {selectTheme} from "../../theme";
import {costCentersOptions, listByOptions} from "./select-data";
import {tableData, theadData} from "./table-data";
import {exportToCSV} from "../../store/actions/appActions";
import ErrorBoundary from "../../components/ErrorBoundary";

const ReportingCostCenterScreen = props => {
    const {title} = props;
    const [costCenters, setCostCenters] = useState(null);
    const [listBy, setListBy] = useState(null);
    const isFilterActive = (costCenters && listBy);
    const [allTotalHours, setAllTotalHours] = useState(0);

    useEffect(() => {
        setAllTotalHours(64)
    }, [])

    const handleChangeCostCenters = selectedOption => setCostCenters(selectedOption);
    const handlerChangelistBy = selectedOption => setListBy(selectedOption);

    return (
        <ErrorBoundary>
            <div className="app-content pb-4">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 col-lg-6">
                            <h1 className="title">
                                <span className="color-green">{title}</span>
                                <svg className='drop-down' width="10" height="7" viewBox="0 0 10 7" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 1.33301L5 5.33301L1 1.33301L9 1.33301Z" fill="#A1A1AA"
                                          stroke="#A1A1AA"/>
                                </svg>
                                <span>Reporting</span>
                            </h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="filters">
                                <div className="filters__body">
                                    <div className="filter select-box">
                                        <label>
                                            <span>Cost centers</span>
                                            <Select value={costCenters}
                                                    onChange={handleChangeCostCenters}
                                                    options={costCentersOptions}
                                                    theme={selectTheme}/>
                                        </label>
                                    </div>
                                    <div className="filter mr-3">
                                        <label>
                                            <span>Start date</span>
                                            <input className="form-control"
                                                   type="date"
                                                   name="startDate"
                                            />
                                        </label>
                                    </div>
                                    <div className="filter mr-3">
                                        <label>
                                            <span>End date</span>
                                            <input className="form-control"
                                                   type="date"
                                                   name="endDate"
                                            />
                                        </label>
                                    </div>
                                    <div className="filter select-box">
                                        <label>
                                            <span>List by</span>
                                            <Select value={listBy}
                                                    onChange={handlerChangelistBy}
                                                    options={listByOptions}
                                                    theme={selectTheme}/>
                                        </label>
                                    </div>

                                </div>
                            </div>
                            <div className="filters__footer mt-4">
                                <button className="btn btn--green" disabled>Create new report</button>
                            </div>
                        </div>
                    </div>
                    {(isFilterActive) && (
                        <div className="row">
                            <div className="col-12">
                                <div className="reporting mt-40">
                                    <div className="reporting__header">
                                        <h2 className="reporting-companyName">Cost center name 1 (1.12.2020 -
                                            31.12.2020).
                                            Sorted by Customers</h2>
                                    </div>
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            {theadData.map(el => <th key={el}>{el}</th>)}
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {tableData.map(el => (
                                            <tr key={el.id}>
                                                <td>{el.customer}</td>
                                                <td>{el.jobRole}</td>
                                                <td>{el.totalHours}</td>
                                                <td>{el.totalJobs}</td>
                                            </tr>
                                        ))}
                                        <tr>
                                            <td className="text-bold">Grand total:</td>
                                            <td/>
                                            <td>{allTotalHours}</td>
                                            <td>17</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="mt-4">
                                    <button className="btn btn--green"
                                            onClick={() => exportToCSV(tableData, "document")}>
                                        Export as .xls document
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </ErrorBoundary>
    );
}

ReportingCostCenterScreen.propTypes = {
    title: PropTypes.string
}

export default ReportingCostCenterScreen;
