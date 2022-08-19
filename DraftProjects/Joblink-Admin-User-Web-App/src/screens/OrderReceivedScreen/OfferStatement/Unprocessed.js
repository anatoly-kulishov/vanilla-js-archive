import React, {useState} from 'react';
import moment from "moment";
import Default from "./Default";
import {cancelOrderByEvent, createJobOffer} from "../../../store/actions/ordersActions";
import {useDispatch} from "react-redux";

const Unprocessed = props => {
    const {data} = props;
    const {order} = data;
    const dispatch = useDispatch();
    const [showHistory, setShowHistory] = useState(false);

    const cancelOrderHandler = (orderId) => {
        let isCancel = window.confirm("Are you sure you want to cancel this order?");
        if (isCancel) dispatch(cancelOrderByEvent(orderId));
    }

    return (
        <>
            <Default data={data}/>
            <div className="row">
                <div className="col-12">
                    <div
                        className="d-flex flex-wrap flex-md-nowrap justify-content-center align-items-center justify-content-md-between pt-4 pb-4">
                        <div className="btn-group pb-4 pb-md-0">
                            <div className="btn btn--green mr-12"
                                 onClick={() => dispatch(createJobOffer(order.id, order.JobOrder.description))}>
                                Create Offer
                            </div>
                            <div className="btn btn--light-danger"
                                 onClick={() => cancelOrderHandler(order.id)}>Cancel
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
                                    <span className="info-col__label ml-1">
                                        Company created Job Order
                                    </span>
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
        </>
    );
}

export default Unprocessed;
