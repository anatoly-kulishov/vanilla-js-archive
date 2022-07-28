import {
    FETCH_ADMINS,
    FETCH_USERS,
    REMOVE_FROM_SELECTED_ACCOUNT, RESET_SELECTED_USER, RESET_USERS_LOADER, SEARCH_ADMINS, SEARCH_USERS,
    SELECT_USER, UPDATE_USER_INFO
} from "../types";

const initialState = {
    termUsers: '',
    termAdmins: '',
    fetchedUsers: [1, 2, 3],
    fetchedAdmins: [],
    selectedAccount: null,
    loading: true,
    response: null
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_USER_INFO:
            return {
                ...state,
                response: action.response
            }
        case FETCH_USERS:
            return {
                ...state,
                loading: false,
                fetchedUsers: action.fetchedUsers
            }
        case SEARCH_USERS:
            return {
                ...state,
                termUsers: action.payload
            }
        case FETCH_ADMINS:
            return {
                ...state,
                loading: false,
                fetchedAdmins: action.fetchedAdmins
            }
        case SEARCH_ADMINS:
            return {
                ...state,
                termAdmins: action.payload
            }
        case SELECT_USER:
            return {
                ...state,
                loading: false,
                selectedAccount: action.payload
            }
        case RESET_SELECTED_USER:
            return {
                ...state,
                loading: false,
                selectedAccount: []
            }
        case REMOVE_FROM_SELECTED_ACCOUNT:
            return {
                ...state,
                selectedAccount: null
            }
        case RESET_USERS_LOADER: {
            return {
                ...state,
                loading: true
            }
        }
        default:
            return state;
    }
}

export default usersReducer;
