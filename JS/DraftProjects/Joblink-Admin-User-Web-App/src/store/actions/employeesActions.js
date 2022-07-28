import employeesAPI from "../../api/employeesAPI";
import {
    ADD_EMPLOYEES_TO_ORDER,
    EDIT_EMPLOYEE_INFO_FAILED,
    EDIT_EMPLOYEE_INFO_SUCCESS,
    FETCH_ALL_EMPLOYEES,
    FETCH_ALL_POTENTIAL_EMPLOYEES
} from "../types";
import {getAllJobEvents} from "./ordersActions";

/**
 * Get all visible ProfileScreen satisfying filters, also include extra attributes to each ProfileScreen. Only filters/attributes specified in request
 * @param:number id
 * @returns {(function(*): void)|*}
 */
export const getAllEmployees = () => {
    return (dispatch) => {
        employeesAPI.getAllEmployees().then(data => {
            dispatch({
                type: FETCH_ALL_EMPLOYEES,
                payload: data
            })
        }).catch((e) => console.log(e));
    }
}


/**
 * Returns all potential employees for the job offer of job event :id.
 * The endpoint returns all employees who are available to accept the job offer. Filtering will be done on frontend.
 * The response contains an array of Employee with extra attributes.
 * "AcceptedOffers": list of all accepted offers of the Employee that overlap with
 * [24h before the job event's "start", 48h after job event's "end").
 * @param:number id
 * @returns {(function(*): void)|*}
 */
export const getAllPotentialEmployees = (id) => {
    return (dispatch) => {
        employeesAPI.getAllPotentialEmployees(id).then(data => {
            dispatch({
                type: FETCH_ALL_POTENTIAL_EMPLOYEES,
                payload: data
            })
        }).catch((e) => console.log(e));
    }
}

/**
 * Send the job offer of the job event :id to a list of employees.
 * Body is an array of employees' IDs. The event must be in offer phase, and has not been filled.
 * @param:number employeeId
 * @param:object employees
 * @returns {(function(*): void)|*}
 */
export const sendOfferToEmployees = (employeeId, employees) => {
    return dispatch => {
        employeesAPI.sendOfferToEmployees(employeeId, employees).then(() => {
            dispatch({
                type: ADD_EMPLOYEES_TO_ORDER,
                employees
            })
            dispatch(getAllJobEvents())
        }).catch((e) => console.log(e));
    }
}

/**
 * Update data of an Employee by sending :id and data fields to be updated.
 * Employee can only update himself all fields except 'CostCenterId' and 'internalComment'.
 * JA can update all fields.
 * JU can only update field 'internalComment'.
 * @param employeeId
 * @param employees
 * @return {(function(*): void)|*}
 */
export const updateEmployeeInfo = (employeeId, employees) => {
    return dispatch => {
        employeesAPI.editEmployeeInfo(employeeId, employees).then(res => {
            dispatch({
                type: EDIT_EMPLOYEE_INFO_SUCCESS,
                payload: res
            })
            dispatch(getAllEmployees())
        }).catch((e) => {
            console.log(e)
            dispatch({
                type: EDIT_EMPLOYEE_INFO_FAILED,
                payload: e.toString()
            })
        });
    }
}

export const addingEmployeesToOrder = (employees) => ({
    type: ADD_EMPLOYEES_TO_ORDER,
    employees
})
