import accountAPI from "../../api/accountAPI";
import {FETCH_ACCOUNTS, SELECT_ACCOUNT} from "../types";
import {showAlert} from "./appActions";

/**
 * Get all company account that the user have access to.
 * @returns {(function(*): void)|*}
 */
export const getAllCompanyAccount = () => {
    return (dispatch) => {
        accountAPI.getAllCompanyAccount().then(data => {
            dispatch({
                type: FETCH_ACCOUNTS,
                fetchedAccounts: data
            })
        }).catch((e) => console.log(e));
    }
}

/**
 * Get one company account with all locations, job roles, and skills.
 * @param:number id
 * @returns {(function(*): void)|*}
 */
export const getOneCompany = (id) => {
    return (dispatch) => {
        accountAPI.getOneCompany(id).then(data => {
            dispatch({
                type: SELECT_ACCOUNT,
                payload: data
            })
        }).catch((error) => console.log(error));
    }
}

/**
 * Create one company account by sending its data fields.
 * @param values
 * @return {(function(*): void)|*}
 */
export const createOneCompanyAccount = (values) => {
    return (dispatch) => {
        accountAPI.createOneCompanyAccount(values).then(() => {
            dispatch(getAllCompanyAccount())
        }).catch((error) => console.log(error));
    }
}

/**
 * Update one company account by sending its :id and new data fields.
 * @param:number id
 * @param:object values
 * @param:function setSubmitting
 * @returns {(function(*): void)|*}
 */
export const updateOneCompany = (id, values, setSubmitting) => {
    return (dispatch) => {
        accountAPI.updateOneCompany(id, values).then(() => {
            dispatch(showAlert('success', 'Changes have been applied'))
            setSubmitting(false)
        }).catch((e) => {
            dispatch(showAlert('danger', e.toString()));
            setSubmitting(false);
        });
    }
}
