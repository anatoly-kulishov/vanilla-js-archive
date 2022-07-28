import React, {useState} from 'react';
import moment from "moment";
import Default from "./Default";

const Filled = props => {
    const {order} = props.data;
    const [showHistory, setShowHistory] = useState(false);
    const jobOffer = order?.JobOffer;

    return (
        <>
            <Default data={props.data}/>
            <div className="row">
                <div className="col-12">
                    <div className="white-shadow-box mb-1">
                        <div className="mb-3">Employees</div>
                        <div className="info-cols">
                            {jobOffer.AcceptedEmployee ? (
                                <div className="info-col">
                                    <span
                                        className="info-col__label">{jobOffer?.AcceptedEmployee.firstName} {jobOffer?.AcceptedEmployee.lastName}</span>
                                    <div>
                                        <small className="text-success mr-2">Offer accepted</small>
                                        <small className="text-danger pointer">Cancel the acceptance</small>
                                    </div>
                                </div>
                            ) : <div className="text-undefined">Not assigned yet</div>}
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div
                        className="d-flex flex-wrap flex-md-nowrap justify-content-center align-items-center justify-content-md-between pt-4 pb-4">
                        <div className="btn-group pb-4 pb-md-0">
                            <div className="btn btn--green mr-12">Assign Employee</div>
                            <button className="btn btn--light-green mr-12" disabled>Edit offer</button>
                            <button className="btn btn--light-danger" disabled>Cancel offer</button>
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
                                    <div className="info-col__label">
                                        {moment(order?.createdAt).format('MMMM D YYYY, h:mm a')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default Filled;
