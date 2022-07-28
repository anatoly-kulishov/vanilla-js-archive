import {
    HIDE_ALERT,
    HIDE_LOADER, INITIALIZED_SUCCESS,
    SHOW_ALERT,
    SHOW_LOADER,
} from "../types";

const initialState = {
    initialized: false,
    isLoading: true,
    alert: null,
    globalErrors: null
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        case SHOW_LOADER:
            return {
                ...state,
                isLoading: true
            }
        case HIDE_LOADER:
            return {
                ...state,
                isLoading: false
            }
        case SHOW_ALERT:
            return {
                ...state,
                alert: action.payload
            }
        case HIDE_ALERT:
            return {
                ...state,
                alert: null
            }
        default:
            return state
    }
}

export default appReducer;
