import {
    ADD_EMPLOYEES_TO_ORDER, EDIT_EMPLOYEE_INFO_FAILED, EDIT_EMPLOYEE_INFO_SUCCESS, FETCH_ALL_EMPLOYEES,
    FETCH_ALL_POTENTIAL_EMPLOYEES, SEARCH_EMPLOYEE,
    SEND_OFFER_TO_EMPLOYEES
} from "../types";

const initialState = {
    term: '',
    isLoading: true,
    response: null,
    fetchedEmployees: [],
    potentialEmployees: [],
    addedEmployees: null,
}

const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ALL_EMPLOYEES:
            return {
                ...state,
                fetchedEmployees: action.payload,
                isLoading: false
            }
        case FETCH_ALL_POTENTIAL_EMPLOYEES:
            return {
                ...state,
                potentialEmployees: action.payload,
                isLoading: false
            }
        case EDIT_EMPLOYEE_INFO_SUCCESS:
            return {
                ...state,
                response: action.payload
            }
        case EDIT_EMPLOYEE_INFO_FAILED:
            return {
                ...state,
                response: {
                    status: 400,
                    data: {
                        message: action.payload
                    }
                }
            }
        case ADD_EMPLOYEES_TO_ORDER:
            return {
                ...state,
                addedEmployees: action.employees,
                isLoading: false
            }
        case SEND_OFFER_TO_EMPLOYEES:
            return {
                ...state,
                isLoading: false
            }
        case SEARCH_EMPLOYEE:
            return {
                ...state,
                term: action.payload
            }
        default:
            return state;
    }
}

export default ordersReducer;
