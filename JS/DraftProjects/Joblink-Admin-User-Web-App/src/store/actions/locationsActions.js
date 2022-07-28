import locationAPI from "../../api/locationAPI";
import {GET_ONE_LOCATION} from "../types";
import {getOneCompany} from "./accountsActions";

/**
 * Get one location with all related job roles, all skills, company account, and cost center.
 * @param:number id
 * @returns {(function(*): void)|*}
 */
export const getOneLocation = (id, CompanyAccountId) => {
    return (dispatch) => {
        locationAPI.getOneLocation(id).then(data => {
            console.log(data)
            dispatch({
                type: GET_ONE_LOCATION,
                payload: data,
                CompanyAccountId
            })
        }).catch((e) => console.log(e));
    }
}

/**
 * Create one location attached to a company account and a cost center.
 * @param companyId
 * @param CostCenterId
 * @param values
 */
export const createOneLocation = (companyId, CostCenterId, values) => {
    return (dispatch) => {
        locationAPI.createOneLocation(companyId, CostCenterId, values).then(() => {
            dispatch(getOneCompany(companyId))
        }).catch((e) => console.log(e));
    }
}

/**
 * Update one location by sending its :id and new data fields.
 * @param id
 * @param companyId
 * @param values
 * @return {(function(*): void)|*}
 */
export const updateOneLocation = (id, companyId, values) => {
    return (dispatch) => {
        locationAPI.updateOneLocation(id, values).then(() => {
            dispatch(getOneCompany(companyId))
        }).catch((e) => console.log(e));
    }
}
