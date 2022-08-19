import {CLEAR_TASKS_RESPONSE, CREATE_ONE_TASK, FETCH_TASKS, REMOVE_TASK_SKILL} from "../types";

const initialState = {
    fetchedTasks: [],
    isLoading: true,
    response: null
}

const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TASKS:
            return {
                ...state,
                isLoading: false,
                fetchedTasks: action.fetchedTasks
            }
        case CREATE_ONE_TASK:
            return {
                ...state,
                response: action.response
            }
        case REMOVE_TASK_SKILL:
            return {
                ...state,
                fetchedTasks: action.fetchedTasks[action.taskId].Skills.filter(skill => skill.id === action.skillId)
            }
        case CLEAR_TASKS_RESPONSE:
            return {
                ...state,
                response: null
            }
        default:
            return state;
    }
}

export default tasksReducer;
