import {
    FETCH_ADMINS,
    FETCH_USERS,
    RESET_SELECTED_USER, RESET_USERS_LOADER,
    SELECT_USER, UPDATE_USER_INFO,
} from "../types";
import usersAPI from "../../api/usersApi";

/**
 * Get all visible Joblink users.
 * @returns {(function(*): void)|*}
 */
export const getAllUsers = () => {
    return (dispatch) => {
        usersAPI.getAllUsers().then(data => {
            const fetchedUsers = data.filter(account => account.class === 'user');
            dispatch({
                type: FETCH_USERS,
                fetchedUsers
            })
            const fetchedAdmins = data.filter(account => account.class === 'admin');
            dispatch({
                type: FETCH_ADMINS,
                fetchedAdmins
            })
        }).catch((e) => console.log(e));
    }
}

/**
 *
 * @param:number id
 * @returns {(function(*): void)|*}
 */
export const getUserById = (id) => {
    return (dispatch) => {
        usersAPI.getUserById(id).then(data => {
            dispatch({
                type: SELECT_USER,
                payload: data
            })
        }).catch((e) => console.log(e));
    }
}

/**
 * Update data of a Customer user by sending :id and data fields to be updated.
 * @param:number id
 * @param:object values
 * @returns {(function(*): void)|*}
 */
export const updateUserById = (id, values) => {
    return (dispatch) => {
        usersAPI.updateUserById(id, values).then(response => {
            dispatch({
                type: UPDATE_USER_INFO,
                response
            })
            dispatch(getAllUsers())
            dispatch(getUserById(id))
        }).catch((e) => {
            console.log(e)
        });
    }
}

export const resetUsersLoader = () => ({
    type: RESET_USERS_LOADER
})

export const resetFromSelectedAccount = () => (dispatch) => {
    dispatch({type: RESET_SELECTED_USER})
}
