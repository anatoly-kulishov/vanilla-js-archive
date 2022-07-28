import {CLEAR_TASKS_RESPONSE, CREATE_ONE_TASK, FETCH_TASKS, REMOVE_TASK_SKILL} from "../types";
import tasksAPI from "../../api/tasksApi";

/**
 * Get all visible preset tasks and skills.
 * @return {(function(*): void)|*}
 */
export const getAllPresetTasksAndSkills = () => {
    return (dispatch) => {
        tasksAPI.getAllPresetTasksAndSkills().then(data => {
            dispatch({
                type: FETCH_TASKS,
                fetchedTasks: data
            })
        }).catch((e) => console.log(e));
    }
}

/**
 * Get all visible preset tasks and skills.
 * @param:object values
 * @return {(function(*): void)|*}
 */
export const createOnePresetTasks = (values) => {
    return (dispatch) => {
        tasksAPI.createOnePresetTasks(values).then(response => {
            console.log(response)
            dispatch({
                type: CREATE_ONE_TASK,
                response
            })
        }).then(() => dispatch(getAllPresetTasksAndSkills())).catch((e) => console.log(e));
    }
}

/**
 * Delete a skill from a preset task. Path parameter :id must refer to an existing skill.
 * @param:number taskId
 * @param:number skillId
 * @returns {(function(*): void)|*}
 */
export const deleteSkillFromPresetTask = (taskId, skillId) => {
    return (dispatch) => {
        tasksAPI.deleteSkillFromPresetTask().then(() => {
            dispatch({
                type: REMOVE_TASK_SKILL,
                taskId,
                skillId
            })
        }).catch((e) => console.log(e));
    }
}

export const clearTasksResponse = () => (dispatch) => dispatch({type: CLEAR_TASKS_RESPONSE});
