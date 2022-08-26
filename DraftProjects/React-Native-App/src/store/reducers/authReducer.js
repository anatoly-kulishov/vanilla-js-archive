import {GET_MY_PROFILE, REFRESH_TOKEN, SIGN_IN, SIGN_OUT} from "../types";

const initialState = {
    isLoading: true,
    auth: false,
    token: null,
    profile: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGN_IN:
            return {
                ...state,
                auth: true,
                token: action.payload,
            }
        case SIGN_OUT:
            return {
                ...state,
                auth: false,
                token: null
            }
        case GET_MY_PROFILE:
            return {
                ...state,
                profile: action.payload,
                isLoading: false,
            }
        case REFRESH_TOKEN:
            return {
                ...state,
                auth: true,
                token: action.payload
            }
        default:
            return state
    }
}

export default authReducer;
