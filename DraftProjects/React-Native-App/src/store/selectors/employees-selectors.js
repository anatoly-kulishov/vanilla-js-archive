import {createSelector} from "reselect";

/*********************** Simple Selectors ***********************/
export const getEmployees = (state) => state.employees.employees;
export const getEmployeesIsLoading = (state) => state.employees.isLoading;


/*********************** Super Selectors ***********************/
// export const getReversedEmployees = createSelector(getEmployees,
//     (employees) => {
//         console.log(employees)
//         return employees
//     })
