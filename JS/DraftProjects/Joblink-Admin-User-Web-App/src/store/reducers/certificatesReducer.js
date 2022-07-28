import {FETCH_CERTIFICATES, SEARCH_CERTIFICATES} from "../types";

const initialState = {
    term: '',
    certificateType: [],
    isLoading: true,
    response: null
}

const certificatesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CERTIFICATES:
            return {
                ...state,
                certificateType: action.certificateType,
                isLoading: false
            }
        case SEARCH_CERTIFICATES:
            return {
                ...state,
                term: action.payload
            }
        default:
            return state;
    }
}

export default certificatesReducer;
