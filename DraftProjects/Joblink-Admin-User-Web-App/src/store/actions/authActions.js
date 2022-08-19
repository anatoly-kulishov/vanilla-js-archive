import Cookies from 'js-cookie';
import {AUTHORIZATION, LOG_OUT, RESET_PASSWORD, SIGN_IN} from "../types";
import {__resetEmail_} from "../../constants";
import {hideAlert, showAlert} from "./appActions";
import authAPI from "../../api/authAPI";
import {baseInstance} from "../../api/instances";

/**
 * Send email, password to retrieve a JWT token that can be used in authenticated end points
 * @param:object profile
 * @param:function setSubmitting
 * @param:function resetForm
 * @returns {(function(*): void)|*}
 */
export const signIn = (profile, setSubmitting, resetForm) => {
    return (dispatch) => {
        authAPI.signIn(profile).then(data => {
            setSubmitting(false);
            dispatch(hideAlert());
            const access_token = data.token;
            if (access_token) {
                resetForm();
                Cookies.set('token', access_token)
                dispatch({
                    type: SIGN_IN,
                    token: access_token
                })
            }
        }).then(() => dispatch(authMe())).catch((e) => {
            console.log(e);
            setSubmitting(false);
            dispatch(showAlert('warning', e.toString()));
        });
    }
}

/**
 * Return the profile of the request caller.
 * @returns {(function(*): void)|*}
 */
export const authMe = () => {
    return (dispatch) => {
        baseInstance.interceptors.request.use(function (config) {
            const token = Cookies.get('token');
            config.headers.Authorization = token ? `${token}` : '';
            return config;
        });
        authAPI.authMe().then(data => {
            dispatch({
                type: AUTHORIZATION,
                payload: data
            })
        }).catch(() => dispatch(logOut()));
    }
}

export const logOut = () => {
    return (dispatch) => {
        Cookies.remove('token');
        dispatch({type: LOG_OUT})
    }
}

export const resetPassword = (email) => {
    sessionStorage.setItem(__resetEmail_, email);
    return {
        type: RESET_PASSWORD,
        payload: email
    }
}
