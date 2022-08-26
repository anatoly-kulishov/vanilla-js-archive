import costCentersAPI from "../../api/costCentersAPI";
import {FETCH_COST_CENTERS} from "../types";

/**
 * Get all visible cost centers. If requester is JA, each cost center have its list of locations.
 * @returns {(function(*): void)|*}
 */
export const getAllCostCenters = () => {
    return (dispatch) => {
        costCentersAPI.getAllCostCenters().then(data => {
            dispatch({
                type: FETCH_COST_CENTERS,
                fetchedCostCenters: data
            })
        }).catch(e => console.log(e))
    }
}

/**
 * Create one cost center.
 * @param costCenterName
 * @return {(function(*): void)|*}
 */
export const createOneCostCenter = (costCenterName) => {
    return (dispatch) => {
        costCentersAPI.createOneCostCenter(costCenterName).then(res => {
            console.log(res)
        }).catch(e => console.log(e))
    }
}

/**
 * Update one cost center.
 * @param id
 * @param costCenterName
 * @return {(function(*): void)|*}
 */
export const updateOneCostCenterById = (id, costCenterName) => {
    return (dispatch) => {
        costCentersAPI.updateOneCostCenterById(id, costCenterName).then(res => {
            console.log(res)
        }).catch(e => console.log(e))
    }
}
