import React, {memo, useState} from 'react';
import {NavLink} from "react-router-dom";
import moment from "moment";
import Default from "./Default";
import Modal from "react-modal";
import CancelOrAbortForm from "./CancelOrAbortForm";

const Open = props => {
    const {order} = props.data;
    const [showHistory, setShowHistory] = useState(false);
    const jobOffer = order?.JobOffer;

    // Cancel or Abort Modal Data
    const [modalIsOpen, setIsOpen] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const [modalFormat, setModalFormat] = useState(null);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const onCancelOffer = (orderId) => {
        openModal();
        setModalFormat('cancel');
        setOrderId(orderId);
    };

    const onAbortOffer = (orderId) => {
        openModal();
        setModalFormat('abort');
        setOrderId(orderId);
    };

    return (
        <>
            <Default data={props.data}/>
            <div className="row">
                <div className="col-12">
                    <div className="white-shadow-box mb-1">
                        <div className="mb-3">Employees</div>
                        <div className="info-cols">
                            {jobOffer?.ReceivedEmployees && jobOffer.ReceivedEmployees.map(employee => (
                                <div className="info-col" key={employee.id}>
                                    <span
                                        className="info-col__label">{employee.firstName} {employee.lastName}</span>
                                    <div>
                                        <small
                                            className="text-grey">
                                            {employee?.SentEmployees?.type}
                                        </small>
                                    </div>
                                </div>
                            ))}
                            {(!jobOffer.AcceptedEmployee && !jobOffer.ReceivedEmployees.length) &&
                            <div className="text-undefined">Not assigned yet</div>}
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div
                        className="d-flex flex-wrap flex-md-nowrap justify-content-center align-items-center justify-content-md-between pt-4 pb-4">
                        <div className="btn-group pb-4 pb-md-0">
                            <NavLink className="btn btn--green mr-12"
                                     to={`/event-listing/${order?.id}/employee-assignment`}>
                                Add Employees
                            </NavLink>
                            <div className="btn btn--light-green mr-12"
                                 onClick={() => console.log("Edit offer")}>
                                Edit offer
                            </div>
                            <div className="btn btn--light-danger mr-12"
                                 onClick={() => onCancelOffer(order.id)}>
                                Cancel offer
                            </div>
                            <div className="btn btn--outline-danger mr-12"
                                 onClick={() => onAbortOffer(order.id)}>
                                Abort offer
                            </div>
                        </div>
                        <button className="btn btn--default"
                                onClick={() => setShowHistory(!showHistory)}>
                            {showHistory ? "Hide" : 'Show'} document history
                        </button>
                    </div>
                </div>
                {showHistory && (
                    <div className="col-12">
                        <div className="white-shadow-box mb-1">
                            <div className="mb-3">Document History</div>
                            <div className="info-cols">
                                <div className="info-col">
                                    <span className="info-col__label">Company created Job Order</span>
                                </div>
                                <div className="info-col">
                                    <span className="info-col__label">
                                        {moment(order?.createdAt).format('MMMM D YYYY, h:mm a')}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Modal isOpen={modalIsOpen} ariaHideApp={false}
                   contentLabel={`Cancel or ${modalFormat}`}>
                <span className="icon-close" onClick={closeModal}/>
                <div className="modal-head">
                    <div className="modal-title">Are you sure?</div>
                </div>
                <div className="modal-body">
                    <CancelOrAbortForm
                        id={orderId}
                        modalFormat={modalFormat}
                        closeModal={closeModal}/>
                </div>
            </Modal>
        </>
    );
}

export default memo(Open);
