import axios from "axios";
import {SET_EMPLOYEES} from "../types";
import {_apiBase} from "../../constants";

export const getEmployeeData = (jobRoleId = 1, costCenterIds = 1) => {
    return (dispatch) => {
        axios.post(`${_apiBase}/employees`, {
            "filters": {
                "available": {
                    "start": "2021-01-01T09:40:00.000Z",
                    "end": "2021-01-01T10:00:00.000Z"
                },
                "costCenterIds": [
                    costCenterIds
                ]
            },
            "includes": {
                "AcceptedOffers": {
                    "start": new Date(),
                    "end": "2022-01-02T00:00:00.000Z"
                },
                "ReceivedOffers": {
                    "start": "2021-01-01T00:00:00.000Z",
                    "end": "2022-01-02T00:00:00.000Z"
                },
                "RatedByJobRole": {
                    "JobRoleId": jobRoleId
                },
                "Skills": true,
                "Certificates": true
            }
        }).then(res => {
            dispatch({
                type: SET_EMPLOYEES,
                payload: res.data
            })
        }).catch((e) => console.error(e));
    }
}
