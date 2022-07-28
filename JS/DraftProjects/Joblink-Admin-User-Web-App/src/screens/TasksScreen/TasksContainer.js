import {connect} from "react-redux";
import Tasks from "./Tasks";
import {clearTasksResponse, createOnePresetTasks, getAllPresetTasksAndSkills} from "../../store/actions/tasksActions";

const mapStateToProps = (state) => ({
    tasks: state.tasks.fetchedTasks,
    response: state.tasks.response,
    loading: state.tasks.loading
})

const TasksContainer = connect(mapStateToProps, {
    getAllPresetTasksAndSkills,
    createOnePresetTasks,
    clearTasksResponse,
})(Tasks);

export default TasksContainer;