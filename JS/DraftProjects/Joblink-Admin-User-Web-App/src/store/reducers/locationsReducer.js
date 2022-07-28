import {
    SEARCH_LOCATIONS,
} from "../types";

const initialState = {
    term: '',
    location: [],
    isLoading: true,
    response: null
}

const locationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_LOCATIONS:
            return {
                ...state,
                term: action.payload
            }
        default:
            return state;
    }
}

export default locationsReducer;
