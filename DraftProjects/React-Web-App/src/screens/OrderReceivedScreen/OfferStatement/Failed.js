import React, {useState} from 'react';
import moment from "moment";
import Default from "./Default";

const Failed = props => {
    const {order, employees} = props.data;
    const [showHistory, setShowHistory] = useState(false);

    return (
        <>
            <Default data={props.data}/>
            <div className="row">
                <div className="col-12">
                    <div className="white-shadow-box mb-1">
                        <div className="mb-3">Employees</div>
                        <div className="info-cols">
                            {employees ? (
                                <div className="info-col">
                                    <span className="info-col__label">Name Surname</span>
                                </div>
                            ) : <div className="text-undefined">Not assigned yet</div>}
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
                                    <span className="info-col__label">
                                        {moment(order?.createdAt).format('MMMM D YYYY, h:mm a')}
                                    </span>
                                </div>
                            </div>
                            <div className="info-cols mt-4">
                                <div className="info-col">
                                    <span className="info-col__label">Job Order Failed</span>
                                </div>
                                <div className="info-col">
                                    <span className="info-col__label">
                                        {moment(order?.updatedAt).format('MMMM D YYYY, h:mm a')}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        </>
    );
}

export default Failed;
