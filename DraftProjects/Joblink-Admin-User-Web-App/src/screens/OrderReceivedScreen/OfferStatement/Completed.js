import React from 'react';
import moment from "moment";
import Default from "./Default";

const Completed = props => {
    const {order} = props.data;
    const acceptedEmployee = order?.JobOffer?.AcceptedEmployee;
    const jobLog = order?.JobLog;
    // const [showHistory, setShowHistory] = useState(false);

    return (
        <>
            <Default data={props.data}/>
            <div className="row">
                <div className="col-12">
                    <div className="white-shadow-box pb-3 mb-1">
                        <div className="info-cols">
                            <div className="info-col">
                                <span className="info-col__label">Worker name</span>
                                <div className="user-card mt--2 justify-content-between">
                                    <div className="mr-2">
                                        <div className="info-col__label user-card__name">
                                            {`${acceptedEmployee.firstName} ${acceptedEmployee.lastName}`}
                                        </div>
                                    </div>
                                    <img className="user-card__avatar avatar avatar--mt--1"
                                         src={acceptedEmployee.photoUrl}
                                         alt=""/>
                                </div>
                            </div>
                            <div className="info-col">
                                <span className="info-col__label">Job role</span>
                                <strong className="info-col__title">
                                    {order.JobRole.name}
                                </strong>
                            </div>
                            <div className="info-col">
                                <span className="info-col__label">Date</span>
                                <strong className="info-col__title">
                                    {moment(jobLog.updatedAt).format('D. MMMM YYYY')}
                                </strong>
                            </div>
                        </div>
                        <div className="info-cols mt-3">
                            <div className="info-col">
                                <span className="info-col__label">Start time</span>
                                <strong className="info-col__title">
                                    {moment(order.start).format('LT')}
                                </strong>
                            </div>
                            <div className="info-col">
                                <span className="info-col__label">End time</span>
                                <strong className="info-col__title">
                                    {moment(order.end).format('LT')}
                                </strong>
                            </div>
                            <div className="info-col">
                                <span className="info-col__label">Lunch break</span>
                                <strong className="info-col__title">
                                    {jobLog.Employee_LunchBreak ? jobLog.Employee_LunchBreak : 0}
                                </strong>
                            </div>
                        </div>
                        <div className="info-cols mt-3">
                            <div className="info-col">
                                <span className="info-col__label mb-1">Worker comment</span>
                                <div className="form-control job-log-comment">
                                    {jobLog?.Employee_Comment}
                                </div>
                            </div>
                        </div>
                        <div className="info-cols mt-4">
                            <div className="info-col">
                                <span className="info-col__label mb-1">Customer comment</span>
                                <div className="form-control job-log-comment">
                                    {jobLog?.Joblink_DecisionComment}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*{showHistory && (*/}
                {/*    <div className="col-12">*/}
                {/*        <div className="white-shadow-box mb-1">*/}
                {/*            <div className="mb-3">Document History</div>*/}
                {/*            <div className="info-cols">*/}
                {/*                <div className="info-col">*/}
                {/*                    <span className="info-col__label">Company created Job Order</span>*/}
                {/*                </div>*/}
                {/*                <div className="info-col">*/}
                {/*                    <span className="info-col__label">*/}
                {/*                        {moment(order?.createdAt).format('MMMM D YYYY, h:mm a')}*/}
                {/*                    </span>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*)}*/}
            </div>
        </>
    );
}

export default Completed;
