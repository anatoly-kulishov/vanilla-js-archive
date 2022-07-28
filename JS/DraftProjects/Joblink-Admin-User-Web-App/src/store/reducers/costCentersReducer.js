import {FETCH_COST_CENTERS, SEARCH_COST_CENTERS} from "../types";

const initialState = {
    term: '',
    fetchedCostCenters: [],
    isLoading: true,
    response: null
}

const costCentersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_COST_CENTERS:
            return {
                ...state,
                isLoading: false,
                fetchedCostCenters: action.fetchedCostCenters
            }
        case SEARCH_COST_CENTERS:
            return {
                ...state,
                term: action.payload
            }
        default:
            return state;
    }
}

export default costCentersReducer;
