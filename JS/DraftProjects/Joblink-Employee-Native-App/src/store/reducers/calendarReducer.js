import {
    ADD_RANGE_DATE,
    ADD_SELECTIONS_DATE,
    CREATE_AN_AVAILABILITY,
    GET_ALL_AVAILABILITIES,
    RESET_SELECTED_DAYS
} from "../types";

const initialState = {
    isLoading: true,
    rangeDate: {},
    selectionDate: {},
    availabilitiesDates: [],
    flag: false
}

const calendarReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_RANGE_DATE:
            return {
                ...state,
                rangeDate: {
                    ...state.rangeDate,
                    ...action.payload,
                }
            }
        case ADD_SELECTIONS_DATE:
            return {
                ...state,
                selectionDate: {
                    ...state.selectionDate,
                    ...action.payload,
                }
            }
        case RESET_SELECTED_DAYS:
            return {
                ...state,
                selectionDate: {},
                rangeDate: {},
                flag: !state.flag
            }
        case GET_ALL_AVAILABILITIES:
            return {
                ...state,
                availabilitiesDates: action.payload,
                flag: !state.flag
            }
        case CREATE_AN_AVAILABILITY:
            return {
                ...state,
                flag: true
            }
        default:
            return state
    }
}

export default calendarReducer;
