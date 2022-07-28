import React, {useState, memo} from 'react';
import moment from "moment";
import Default from "./Default";
import {useDispatch} from "react-redux";
import {reActivateJobOffer} from "../../../store/actions/ordersActions";

const Canceled = props => {
    const {order} = props.data;
    const dispatch = useDispatch();
    const [showHistory, setShowHistory] = useState(false);

    const onReActivateJobOrder = (orderId) => {
        dispatch(reActivateJobOffer(orderId))
    }
    return (
        <>
            <Default data={props.data}/>
            <div className="row">
                <div className="col-12">
                    <div
                        className="d-flex justify-content-between pt-4 pb-4">
                        <button className="btn btn--green"
                                onClick={() => onReActivateJobOrder(props.data.orderId)}>
                            Activate
                        </button>
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
                            <div className="info-cols mb-4">
                                <div className="info-col">
                                    <span className="info-col__label">Order canceled by Joblink User/Admin</span>
                                </div>
                                <div className="info-col">
                                    <span
                                        className="info-col__label">{moment(order?.updatedAt).format('MMMM D YYYY, h:mm a')}</span>
                                </div>
                            </div>
                            <div className="info-cols">
                                <div className="info-col">
                                    <span className="info-col__label">Company created Job Order</span>
                                </div>
                                <div className="info-col">
                                    <span
                                        className="info-col__label">{moment(order?.createdAt).format('MMMM D YYYY, h:mm a')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default memo(Canceled);
