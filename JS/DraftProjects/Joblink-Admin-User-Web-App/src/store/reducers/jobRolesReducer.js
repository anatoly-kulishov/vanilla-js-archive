import {GET_ONE_JOB_ROLE_BY_ID} from "../types";

const initialState = {
    jobRole: null,
    isLoading: true,
    response: null
}

const jobRolesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ONE_JOB_ROLE_BY_ID:
            return {
                ...state,
                isLoading: false,
                jobRole: action.payload
            }
        default:
            return state;
    }
}

export default jobRolesReducer;
