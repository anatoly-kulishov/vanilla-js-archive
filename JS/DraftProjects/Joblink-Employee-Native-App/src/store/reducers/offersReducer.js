import {OFFER_ACCEPT, OFFER_DECLINE} from "../types";

const initialState = {
    isLoading: true,
    offers: [],
}

const offersReducer = (state = initialState, action) => {
    switch (action.type) {
        case OFFER_ACCEPT:
            return {
                ...state,
                isLoading: false
            }
        case OFFER_DECLINE:
            return {
                ...state,
                isLoading: false
            }
        default:
            return state
    }
}

export default offersReducer;
