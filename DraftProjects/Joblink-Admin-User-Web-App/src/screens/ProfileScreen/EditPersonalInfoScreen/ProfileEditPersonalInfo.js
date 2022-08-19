import React, {memo} from 'react';
import {useSelector} from "react-redux";
import {useRouteMatch} from "react-router-dom";
import ErrorBoundary from "../../../components/ErrorBoundary";
import {
    getEmployeeById,
    getEmployeesLoadingStatus,
    getEmployeesResponseStatus
} from "../../../store/selectors/employees-selectors";
import LinkBack from "../../../components/LinkBack";
import Alert from "../../../components/Alert/Alert";
import EditPersonalInfoForm from "./EditPersonalInfoForm";
import {updateEmployeeInfo} from "../../../store/actions/employeesActions";
import {checkResponseStatus} from "../../../utils/helpers/responce-helpers";

const ProfileEditPersonalInfo = () => {
    // Other Hooks
    const {params} = useRouteMatch();

    // Selectors
    const employee = useSelector(getEmployeeById(Number(params.employeeId)))?.[0];
    const employeeResponse = useSelector(getEmployeesResponseStatus);
    const employeesLoadingStatus = useSelector(getEmployeesLoadingStatus);

    console.log(employeeResponse)

    return (
        <ErrorBoundary>
            <div className="app-content">
                <div className="container-fluid">
                    {(!employeesLoadingStatus) && (
                        <>
                            <div className="row">
                                <div className="col-12">
                                    <div>
                                        <LinkBack title='Back to Employees'/>
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-12">
                                    <div className="d-flex justify-content-between">
                                        <div className="title-box mt-4 mt-md-3">
                                            <h1 className="title error-title mb-0">{employee?.firstName} {employee?.lastName}</h1>
                                        </div>
                                        <Alert text={employeeResponse?.data?.message}
                                               type={checkResponseStatus(employeeResponse?.status)}/>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <EditPersonalInfoForm
                                        data={employee}
                                        accountId={1}
                                        onSubmit={updateEmployeeInfo}/>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </ErrorBoundary>
    );
}

export default memo(ProfileEditPersonalInfo);
