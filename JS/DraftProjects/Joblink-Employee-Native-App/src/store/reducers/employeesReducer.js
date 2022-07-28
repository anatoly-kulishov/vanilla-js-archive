import {SET_EMPLOYEES} from "../types";

const initialState = {
    isLoading: true,
    employees: []
}

const employeesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_EMPLOYEES:
            return {
                ...state,
                employees: action.payload,
                isLoading: false
            }
        default:
            return state
    }
}

export default employeesReducer;
