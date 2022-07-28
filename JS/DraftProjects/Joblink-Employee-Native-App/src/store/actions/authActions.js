import axios from "axios";
import * as SecureStore from 'expo-secure-store'
import {GET_MY_PROFILE, REFRESH_TOKEN, SIGN_IN, SIGN_OUT} from "../types";
import {_apiBase} from "../../constants";

export const signIn = (profile) => {
    return (dispatch) => {
        axios.post(`${_apiBase}/signin/Employee`, profile)
            .then((res) => {
                const access_token = res.data.token.toString();
                axios.defaults.headers.common["Authorization"] = access_token;
                SecureStore.setItemAsync('token', access_token);
                if (!!access_token) {
                    dispatch({
                        type: SIGN_IN,
                        payload: access_token
                    })
                }
            }).then(() => dispatch(getUserInfo())).catch(e => console.error(e))
    }
}

export const getUserInfo = () => {
    return (dispatch) => {
        axios.get(`${_apiBase}/profile`).then((res) => {
            const profileInfo = res.data.profile;
            dispatch({
                type: GET_MY_PROFILE,
                payload: profileInfo
            })
        }).catch(e => console.error(e))
    }
}

export const refreshToken = () => {
    return (dispatch) => {
        const promise = new Promise((resolve) => {
            resolve(SecureStore.getItemAsync('token'))
        });
        promise.then(token => {
            axios.defaults.headers.common["Authorization"] = token;
            if (token) {
                dispatch({
                    type: REFRESH_TOKEN,
                    payload: token
                })
                dispatch(getUserInfo())
            }
        })

    }
}

export const signOut = () => {
    return async (dispatch) => {
        await SecureStore.deleteItemAsync('token');
        dispatch({
            type: SIGN_OUT
        })
    }
}

