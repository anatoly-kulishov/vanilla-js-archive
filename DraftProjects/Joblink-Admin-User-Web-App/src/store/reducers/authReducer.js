import Cookies from 'js-cookie';
import {AUTHORIZATION, GET_ROLE, INCORRECT_VALUE, LOG_OUT, RESET_PASSWORD, SIGN_IN} from "../types";
import {__resetEmail_} from "../../constants";

const initialState = {
    email_for_reset: window.sessionStorage[__resetEmail_],
    isAuth: Boolean(Cookies.get('token')),
    token: null,
    myProfile: null,
    name: null,
    role: null,
    response: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGN_IN:
            return {
                ...state,
                isAuth: true,
                token: action.token
            }
        case AUTHORIZATION:
            return {
                ...state,
                isAuth: true,
                myProfile: action.payload,
                name: `${action.payload.profile.firstName} ${action.payload.profile.lastName}`,
                role: action.payload.profile.class,
            }
        case GET_ROLE:
            return {
                ...state,
                role: window.localStorage.authRole
            }
        case LOG_OUT:
            return {
                isAuth: false,
                name: null,
                role: null,
                token: null,
                myProfile: null
            }
        case INCORRECT_VALUE:
            return {
                ...state,
                alert: action.payload
            }
        case RESET_PASSWORD:
            return {
                ...state,
                email_for_reset: action.payload
            }
        default:
            return state;
    }
}

export default authReducer;
