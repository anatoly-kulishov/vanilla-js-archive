import {createSelector} from "reselect";

/*********************** Simple Selectors ***********************/
export const getEmployees = (state) => state.employees.fetchedEmployees
export const getEmployeesTerm = (state) => state.employees.term;
export const getPotentialEmployees = (state) => state.employees.potentialEmployees;
export const getEmployeesResponseStatus = (state) => state.employees.response;
export const getEmployeesLoadingStatus = (state) => state.employees.isLoading;


/*********************** Super Selectors ***********************/
export const getEmployeeById = id => {
    return createSelector(
        [getEmployees],
        (employees) => {
            if (employees.length) return employees.filter((employee) => employee.id === id).map(el => el);
        })
}
