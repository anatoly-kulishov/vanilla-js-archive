import axios from "axios";
import {_apiBase} from "../../constants";
import {OFFER_ACCEPT, OFFER_DECLINE} from "../types";

export const acceptOffer = (id) => {
    return dispatch => {
        axios.post(`${_apiBase}/jobevents/${id}/offer/accept`).then(res => {
            console.log(res)
            dispatch({
                type: OFFER_ACCEPT
            })
        }).catch((e) => console.error(e));

    }
}

export const declineOffer = (id) => {
    return dispatch => {
        axios.post(`${_apiBase}/jobevents/${id}/offer/decline`).then(res => {
            console.log(res)
            dispatch({
                type: OFFER_DECLINE
            })
        }).catch((e) => console.error(e));
    }
}

export const submitJobLog = (data) => {
    const {comment, rating, start, end, lunchBreak, jobEventId} = data;
    return (dispatch) => {
        axios.post(`${_apiBase}/jobevents/${jobEventId}/joblog/Employee`, {
            "Employee_Comment": comment,
            "Employee_Rating": rating,
            "Employee_Start": start,
            "Employee_End": end,
            "Employee_LunchBreak": lunchBreak
        }).then(res => console.log(res)).catch((e) => console.error(e));
    }
};