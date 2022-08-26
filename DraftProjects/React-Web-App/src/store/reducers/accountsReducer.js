import {
    FETCH_ACCOUNTS,
    REMOVE_FROM_SELECTED_ACCOUNT, SEARCH_ACCOUNTS,
    SELECT_ACCOUNT
} from "../types";

const initialState = {
    term: '',
    fetchedAccounts: [],
    selectedAccount: null,
    isLoading: true,
    response: null
}

const accountsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ACCOUNTS:
            return {
                ...state,
                fetchedAccounts: action.fetchedAccounts,
                isLoading: false
            }
        case SEARCH_ACCOUNTS:
            return {
                ...state,
                term: action.payload
            }
        case SELECT_ACCOUNT:
            return {
                ...state,
                selectedAccount: action.payload,
                isLoading: false
            }
        case REMOVE_FROM_SELECTED_ACCOUNT:
            return {
                ...state,
                selectedAccount: null
            }
        default:
            return state;
    }
}

export default accountsReducer;
