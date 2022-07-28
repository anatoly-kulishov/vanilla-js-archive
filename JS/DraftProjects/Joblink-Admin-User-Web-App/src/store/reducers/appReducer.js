import {
    DISABLE_BUTTONS,
    ENABLE_BUTTONS,
    HIDE_ALERT, HIDE_MODAL, INITIALIZED_SUCCESS,
    SHOW_ALERT, SHOW_MODAL, TOGGLE_NAV_BAR,
} from "../types";

const initialState = {
    initialized: false,
    globalErrors: null,
    alert: null,
    disable: false,
    showModal: false,
    hideNavBar: false
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
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
        case SHOW_MODAL:
            return {
                ...state,
                showModal: true
            }
        case HIDE_MODAL:
            return {
                ...state,
                showModal: false
            }
        case ENABLE_BUTTONS:
            return {
                ...state,
                disable: false
            }
        case DISABLE_BUTTONS:
            return {
                ...state,
                disable: true
            }
        case TOGGLE_NAV_BAR:
            return {
                ...state,
                hideNavBar: !state.hideNavBar
            }
        default:
            return state
    }
}

export default appReducer;
