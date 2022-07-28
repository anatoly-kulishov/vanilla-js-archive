import React, {useState} from 'react';
import Select from "react-select";
import {tableData, theadData} from "./data";
import {selectTheme} from "../../theme";
import Badge from "../../components/Badge";
import Pagination from "../../components/Pagination";
import ErrorBoundary from "../../components/ErrorBoundary";
import LinkBack from "../../components/LinkBack";
import {mockOptions} from "../../constants";
import {filterOptions} from "./data";

const JobLogsProcessingScreen = props => {
    const {title} = props;
    const [statusFilter, setStatusFilter] = useState({value: 'all', label: 'Show all'});
    const [timeFrame, setTimeFrame] = useState(null);
    const handleStatusFilterChange = selectedOption => setStatusFilter(selectedOption);
    const handleTimeFrameFilterChange = selectedOption => setTimeFrame(selectedOption);

    return (
        <ErrorBoundary>
            <div className="app-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <LinkBack title="Back to Event listing"/>
                            <h1 className="title mt-3">{title} ({tableData.length})</h1>
                        </div>
                        <div className="col-12 mb-4">
                            <div className="filters">
                                <div className="filters__body align-items-end flex-wrap">
                                    <button className="btn btn--green btn--small mr-3 mb-3" disabled>Accept selected
                                    </button>
                                    <div className="form-group mt-md-3 mt-xl-0">
                                        <div className="select-box">
                                            <label>
                                                <span>Status</span>
                                                <Select value={statusFilter}
                                                        onChange={handleStatusFilterChange}
                                                        options={filterOptions}
                                                        theme={selectTheme}/>
                                            </label>
                                        </div>
                                        <div className="select-box visually-hidden">
                                            <label>
                                                <span>Timeframe</span>
                                                <Select value={timeFrame}
                                                        onChange={handleTimeFrameFilterChange}
                                                        options={mockOptions}
                                                        theme={selectTheme}/>
                                            </label>
                                        </div>
                                        <div className="mr-3 w-auto">
                                            <label htmlFor="start-time">Start date</label>
                                            <input className="form-control w-230"
                                                   id="startDate"
                                                   name="startDate"
                                                   type="date"
                                            />
                                        </div>
                                        <div className="w-auto">
                                            <label htmlFor="end-time">End date</label>
                                            <input className="form-control w-230"
                                                   id="endDate"
                                                   name="endDate"
                                                   type="date"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th className="table-checkbox">
                                        <label className="custom-checkbox">
                                            <input name="Fast hand" type="checkbox"/><span/>
                                        </label>
                                    </th>
                                    {theadData.map(el => <th key={el}>{el}</th>)}
                                </tr>
                                </thead>
                                <tbody>
                                {tableData.map(el => {
                                    return (
                                        <tr key={el.id}>
                                            <td className="table-checkbox">
                                                <label className="custom-checkbox">
                                                    <input name="Fast hand" type="checkbox"/><span/>
                                                </label>
                                            </td>
                                            <td className="weight-600">{el.date}</td>
                                            <td>{el.time}</td>
                                            <td>{el.length}</td>
                                            <td>{el.employee}</td>
                                            <td>{el.location}</td>
                                            <td>{el.jobRole}</td>
                                            <td className="badge-box badge-box-single">
                                                <Badge title={el.status.title}
                                                       status={el.status.color}/>
                                            </td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                                <tfoot>
                                <tr>
                                    <td colSpan={theadData.length++}>
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

export default JobLogsProcessingScreen;
