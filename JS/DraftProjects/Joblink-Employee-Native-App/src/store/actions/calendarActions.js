import axios from "axios";
import {
    ADD_RANGE_DATE,
    ADD_SELECTIONS_DATE, CREATE_AN_AVAILABILITY,
    GET_ALL_AVAILABILITIES,
    RESET_SELECTED_DAYS
} from "../types";
import {THEME} from "../../theme";
import {_apiBase} from "../../constants";

export const getAllAvailabilities = (id) => {
    return (dispatch) => {
        axios.get(`${_apiBase}/employees/${id}/availabilities`)
            .then(res => {
                dispatch({
                    type: GET_ALL_AVAILABILITIES,
                    payload: res.data
                })
            }).catch((e) => console.error(e));
    }
}

export const createAnAvailability = (start, end) => {
    return (dispatch) => {
        axios.post(`${_apiBase}/employees/_/availability?force=true`, {start, end}).then(() => {
            dispatch({
                type: CREATE_AN_AVAILABILITY,
            })
        }).catch((e) => console.error(e));
    }
}

export const addSelectionDate = (date) => {
    return dispatch => {
        dispatch({
            type: ADD_SELECTIONS_DATE,
            payload: {[date]: {selected: true, selectedColor: THEME.PRIMARY_COLOR_2, textColor: 'white'}}
        })
    }
}

export const addRangesDate = (date) => {
    return (dispatch) => {
        dispatch({
            type: ADD_RANGE_DATE,
            payload: date
        })
    }
}

export const clearAllSelectedDate = () => {
    return (dispatch) => {
        dispatch({
            type: RESET_SELECTED_DAYS
        })
    }
}
