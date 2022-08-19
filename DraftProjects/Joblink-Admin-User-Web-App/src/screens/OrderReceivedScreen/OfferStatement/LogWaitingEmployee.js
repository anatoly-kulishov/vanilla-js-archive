import React, {useState} from 'react';
import moment from "moment";
import Default from "./Default";

const LogWaitingEmployee = props => {
    const {order} = props.data;
    const AcceptedEmployee = order.JobOffer.AcceptedEmployee;
    const [showHistory, setShowHistory] = useState(false);

    return (
        <>
            <Default data={props.data}/>
            <div className="row">
                <div className="col-12">
                    <div className="white-shadow-box mb-1">
                        <div className="mb-3">Employees</div>
                        <div className="info-cols">
                            <div className="info-col">
                                <div className="user-card">
                                    <img className="user-card__avatar avatar" src={AcceptedEmployee.photoUrl} alt=""/>
                                    <div className="ml-2">
                                        <div className="info-col__label user-card__name">
                                            {AcceptedEmployee.firstName} {AcceptedEmployee.lastName}
                                        </div>
                                        <small className="text-success user-card__desc">Job is done, waiting for job
                                            log</small>
                                    </div>
                                </div>
                            </div>
                            <div className="info-col align-items-end justify-content-end">
                                <div className="btn btn--green"
                                     onClick={() => console.log("Send message()")}>
                                    Send message
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div
                        className="d-flex justify-content-md-end pt-4 pb-4">
                        <button className="btn btn--default"
                                onClick={() => setShowHistory(!showHistory)}>
                            {showHistory ? "Hide" : 'Show'} document history
                        </button>
                    </div>
                </div>
                {showHistory ? (
                    <div className="col-12">
                        <div className="white-shadow-box mb-1">
                            <div className="mb-3">Document History</div>
                            <div className="info-cols">
                                <div className="info-col">
                                    <span className="info-col__label">Company created Job Order</span>
                                </div>
                                <div className="info-col">
                                    <div className="info-col__label">
                                        {moment(order?.createdAt).format('MMMM D YYYY, h:mm a')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        </>
    );
}

export default LogWaitingEmployee;
