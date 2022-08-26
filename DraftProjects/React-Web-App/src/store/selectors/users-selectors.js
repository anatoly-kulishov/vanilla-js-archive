import {createSelector} from "reselect";

/*********************** Simple Selectors ***********************/
export const getUsersSelector = (state) => state.users.users;
export const getIsLoading = (state) => state.users.isLoading;

/*********************** Super Selectors ***********************/
export const getUsers = createSelector(
    [getUsersSelector],
    (users) => {
        return users.filter((user) => user)
    })
