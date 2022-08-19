import jobRolesApi from "../../api/jobRolesApi";
import {GET_ONE_JOB_ROLE_BY_ID} from "../types";
import {getOneCompany} from "./accountsActions";

/**
 * Get one job role with its tasks and skills.
 * @param id
 * @return {(function(*): void)|*}
 */
export const getOneJobRoleById = (id) => {
    return (dispatch) => {
        jobRolesApi.getOneJobRoleById(id).then(data => {
            dispatch({
                type: GET_ONE_JOB_ROLE_BY_ID,
                payload: data
            })
        }).catch((e) => console.log(e));
    }
}

/**
 * Create one job role attached to a location.
 * @param locationId
 * @param companyId
 * @param values
 * @return {(function(*): void)|*}
 */
export const createOneJobRole = (locationId, companyId, values) => {
    return (dispatch) => {
        jobRolesApi.createOneJobRole(locationId, values).then(res => {
            dispatch(getOneCompany(companyId))
        }).catch((e) => console.log(e));
    }
}


/**
 * Update one job role by its ID.
 * @param id
 * @param companyId
 * @param values
 * @return {(function(*): void)|*}
 */
export const updateOneJobRoleById = (id, companyId, values) => {
    return (dispatch) => {
        jobRolesApi.updateOneJobRoleById(id, values).then(() => {
            dispatch(getOneCompany(companyId))
        }).catch((e) => console.log(e));
    }
}

/**
 *
 * @param id
 * @param values
 * @return {(function(*): void)|*}
 */
export const setJobRolesTaskList = (id, values) => {
    return (dispatch) => {
        jobRolesApi.setJobRolesTaskList(id, values).then(res => {
            console.log(res)
        }).catch((e) => console.log(e));
    }
}
