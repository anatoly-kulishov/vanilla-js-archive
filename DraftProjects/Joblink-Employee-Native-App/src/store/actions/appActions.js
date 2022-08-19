import {
    CLIENT_PING_SUCCESS,
    HIDE_ALERT,
    HIDE_LOADER,
    INITIALIZED_SUCCESS,
    SHOW_ALERT,
    SHOW_LOADER,
} from "../types";
import {refreshToken} from "./authActions";
import {getEmployeeData} from "./employeesActions";

export const initializeApp = (isAuth) => {
    if (isAuth) {
        return (dispatch) => {
            const refreshTokenPromise = dispatch(refreshToken());
            const getAllEmployeesPromise = dispatch(getEmployeeData());
            Promise.all([refreshTokenPromise, getAllEmployeesPromise])
                .then(() => {
                    setTimeout(() => dispatch(initializedSuccess()), 1000)
                })
                .catch(() => console.log('initializeApp failed'))
        }
    } else {
        return (dispatch) => {
            const refreshTokenPromise = dispatch(refreshToken());
            Promise.all([refreshTokenPromise])
                .then(() => {
                    setTimeout(() => dispatch(initializedSuccess()), 1000)
                })
                .catch(() => console.log('initializeApp failed'))
        }
    }
}

export const initializedSuccess = () => ({type: INITIALIZED_SUCCESS});

export const clientPing = () => {
    return async (dispatch) => {
        const refreshTokenPromise = dispatch(refreshToken());
        const getEmployeeDataPromise = dispatch(getEmployeeData());
        Promise.all([refreshTokenPromise, getEmployeeDataPromise])
            .then(() => dispatch(clientPingSuccess()))
            .catch(() => console.log('clientPing failed'))
    }
}

export const clientPingSuccess = () => ({type: CLIENT_PING_SUCCESS})

export const showLoader = () => ({
    type: SHOW_LOADER
})

export const hideLoader = () => ({
    type: HIDE_LOADER
})

export const showAlert = (color, text) => ({
    type: SHOW_ALERT,
    payload: {color, text}
})

export const hideAlert = () => ({
    type: HIDE_ALERT
})
