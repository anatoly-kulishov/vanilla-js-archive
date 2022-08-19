import React, {memo, useState} from 'react';
import {useSelector} from "react-redux";
import {useHistory, useRouteMatch} from "react-router-dom";
import ErrorBoundary from "../../components/ErrorBoundary";
import {getEmployeeById} from "../../store/selectors/employees-selectors";
import LinkBack from "../../components/LinkBack";
import EditPastLeaveModal from "./EditPastLeaveModal";
import DeletePastLeaveModal from "./DeletePastLeaveModal";

const ProfileScreen = () => {
    // Other Hooks
    const {params} = useRouteMatch();
    const history = useHistory();

    // States
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

    // Selectors
    const employee = useSelector(getEmployeeById(Number(params.employeeId)))?.[0];
    console.log(employee)

    // Actions
    const openModal = (callback) => callback(true);
    const closeModal = (callback) => callback(false);

    return (
        <ErrorBoundary>
            <div className="app-content">
                <div className="container-fluid">
                    <div className="row mb-3">
                        <div className="col-12">
                            <LinkBack title="Back to Employees"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <h1 className="title d-block error-title">{employee?.firstName} {employee?.lastName}</h1>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="d-flex justify-content-end">
                                <button className="btn btn--green disabled" disabled
                                        onClick={() => history.push('/messages')}>Send
                                    Message
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="white-shadow-box mb-1">
                                <div className="info-cols mb-4">
                                    <div className="info-col">
                                        <span className="info-col__label">Email</span>
                                        <div className="info-col__title">
                                            {employee?.email}
                                        </div>
                                    </div>
                                    <div className="info-col">
                                        <span className="info-col__label">Phone</span>
                                        <div className="info-col__title">
                                            {employee?.phone}
                                        </div>
                                    </div>
                                    <div className="info-col">
                                        <span className="info-col__label">Password</span>
                                        <div className="info-col__title">
                                            <button className="btn btn--light-green disabled" disabled>Send password
                                                reset link
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="info-cols mb-4">
                                    <div className="info-col">
                                        <span className="info-col__label">Cost center</span>
                                        <div className="info-col__title">
                                            CostCenterId: {employee?.CostCenterId}
                                        </div>
                                    </div>
                                    <div className="info-col">
                                        <span className="info-col__label">Home address</span>
                                        <div className="info-col__title">
                                            {employee?.address_Street}, {employee?.address_ZipCode}, {employee?.address_City}
                                        </div>
                                    </div>
                                    <div className="info-col">
                                        <span className="info-col__label">Bank account</span>
                                        <div className="info-col__title">
                                            {employee?.bankAccount}
                                        </div>
                                    </div>
                                </div>
                                <div className="info-cols mb-1">
                                    <div className="info-col">
                                        <span className="info-col__label">Clothing size</span>
                                        <div className="info-col__title">
                                            {employee?.clothingSize}
                                        </div>
                                    </div>
                                    <div className="info-col">
                                        <span className="info-col__label">ID Number</span>
                                        <div className="info-col__title">
                                            {employee?.idNumber}
                                        </div>
                                    </div>
                                    <div className="info-col">
                                        <div className="big-profile-photo">
                                            <img src={employee?.photoUrl} alt=''/>
                                        </div>
                                    </div>
                                </div>
                                <button className="btn btn--light-green"
                                        onClick={() => history.push(`${history.location.pathname}/edit-person-info`)}>Edit
                                    personal info
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="white-shadow-box mb-1">
                                <div className="info-cols">
                                    <div className="info-col">
                                        <span className="info-col__label">Internal Comment</span>
                                        <div className="info-col__title">
                                            {employee?.internalComment}
                                        </div>
                                        <div className="mt-3">
                                            <button className="btn pl-3 pr-3 btn--light-green">Edit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="white-shadow-box mb-1">
                                <div className="info-cols">
                                    <div className="info-col pr-0">
                                        <div className="d-flex justify-content-md-between">
                                            <div>
                                                <span className="info-col__label">Current leave</span>
                                                <div className="info-col__title">
                                                    Sick leave: ...
                                                </div>
                                            </div>
                                            <div>
                                                <button className="btn btn--light-danger"
                                                        onClick={() => openModal(setDeleteModalIsOpen)}>
                                                    Delete
                                                </button>
                                                <button className="btn btn--light-green ml-3"
                                                        onClick={() => openModal(setEditModalIsOpen)}>
                                                    Edit
                                                </button>
                                                <button className="btn btn--light-green ml-3"
                                                        onClick={() => openModal(setEditModalIsOpen)}>
                                                    Add new
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="white-shadow-box mb-1">
                                <div className="info-cols">
                                    <div className="info-col">
                                        <div>
                                            <span className="info-col__label">Favorites</span>
                                            <div className="required-skills mt-1">
                                                {employee?.RatedByJobRoles?.map(el => (
                                                    <div className="skill-box pr-2" key={el.id}>{el.name}</div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="info-col">
                                        <div>
                                            <span className="info-col__label">Disfavorites</span>
                                            <div className="required-skills mt-1">
                                                {employee?.RatedJobRoles?.map(el => (
                                                    <div className="skill-box pr-2" key={el.id}>{el.name}</div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="white-shadow-box mb-1">
                                <div className="info-cols">
                                    <div className="info-col">
                                        <div>
                                            <span className="info-col__label">Skills</span>
                                            <div className="required-skills mt-2">
                                                {employee?.Skills.map(skill => (
                                                    <div className="required-skills" key={skill.id}>
                                                        <div className="skill-box pr-2">{skill.name}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="info-col">
                                        <div>
                                            <span className="info-col__label">Certificates</span>
                                            <div className="certificates-wrapper mt-2">
                                                {employee?.Certificates.map(certificate => (
                                                    <div className="certificate-box" key={certificate.id}>
                                                        <img src={certificate.url} alt=""/>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <EditPastLeaveModal
                maxWidth={900}
                modalIsOpen={editModalIsOpen}
                closeModal={() => closeModal(setEditModalIsOpen)}
                response={null}/>
            <DeletePastLeaveModal
                maxWidth={680}
                modalIsOpen={deleteModalIsOpen}
                closeModal={() => closeModal(setDeleteModalIsOpen)}
                response={null}/>
        </ErrorBoundary>
    );
}

export default memo(ProfileScreen);
