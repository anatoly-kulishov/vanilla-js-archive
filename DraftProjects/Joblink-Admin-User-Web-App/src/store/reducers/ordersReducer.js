import {
    CANCEL_OFFER,
    CREATE_ORDER,
    FETCH_ORDERS, NEW_ORDER_CREATED_FAILED, NEW_ORDER_CREATED_SUCCESS,
    RESET_SELECTED_ORDER, RESET_STATUS_CREATED_ORDER,
    SEARCH_ORDERS,
    SELECT_EMPLOYEES,
    SELECT_ORDER, SHOW_ORDERS_LOADER
} from "../types";

const initialState = {
    term: '',
    loading: true,
    alert: null,
    response: null,
    fetchedOrders: [],
    selectedOrder: [],
    employeeAssignment: false,
    orderCreatedStatus: false,
}

const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ORDERS:
            return {
                ...state,
                fetchedOrders: action.fetchedOrders,
                loading: false,
            }
        case SEARCH_ORDERS:
            return {
                ...state,
                term: action.payload
            }
        case CREATE_ORDER:
            return {
                ...state,
                alert: action.payload
            }
        case SELECT_ORDER:
            return {
                ...state,
                loading: false,
                selectedOrder: action.payload
            }
        case SELECT_EMPLOYEES:
            return {
                ...state,
                employeeAssignment: !state.employeeAssignment
            }
        case RESET_SELECTED_ORDER:
            return {
                ...state,
                selectedOrder: [],
                loading: true
            }
        case SHOW_ORDERS_LOADER:
            return {
                ...state,
                loading: true
            }
        case NEW_ORDER_CREATED_SUCCESS:
            return {
                ...state,
                orderCreatedStatus: true,
                alert: action.payload
            }
        case NEW_ORDER_CREATED_FAILED:
            return {
                ...state,
                orderCreatedStatus: false,
                alert: action.payload
            }
        case RESET_STATUS_CREATED_ORDER:
            return {
                ...state,
                orderCreatedStatus: false,
                alert: null
            }
        case CANCEL_OFFER:
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default ordersReducer;
