import React, {useEffect} from "react";
import {Field, useField, useFormikContext} from "formik";
import {useSelector} from "react-redux";
import {getAllTasks} from "../../../store/selectors/tasks-selectors";

function setTasks(jobRoleId, allTasks) {
    if(jobRoleId) {
        const jobRoles = JSON.parse(localStorage.getItem('companyAccount'))?.JobRoles;
        const tasksJson = jobRoles?.filter(el => el.id === parseInt(jobRoleId))[0]?.Tasks;
        const someTasksArray = allTasks.filter(task => tasksJson.some(someTask => someTask.PresetTaskId === task.id))
        console.log(someTasksArray)
        localStorage.setItem('tasksForGettingNames', JSON.stringify(someTasksArray))
        localStorage.setItem('tasks', JSON.stringify(tasksJson))
    }
}

function changeTasksValue(task) {
    const tasksJSON = JSON.parse(localStorage.getItem('tasks'));
    console.log(tasksJSON);
    const requiredSkills = tasksJSON?.filter(el => el.id === parseInt(task))[0]?.Skills;
    localStorage.setItem('requiredSkills', JSON.stringify(requiredSkills))
}

const MyTasks = (props) => {
    const {values: {jobRole, task, eventSkills}, setFieldValue} = useFormikContext();
    const [field, meta] = useField(props);
    const allTasks = useSelector(getAllTasks);

    useEffect(() => {
        // eslint-disable-next-line
        let isCurrent = true;
        if (task?.trim() !== '') {
            changeTasksValue(task, eventSkills, setFieldValue)
        }
        return () => {
            isCurrent = false;
        };
    }, [task, setFieldValue, props.name, eventSkills])

    useEffect(() => {
        // eslint-disable-next-line
        let isCurrent = true;
        if (jobRole?.trim() !== '') {
            setTasks(jobRole, allTasks)
        } else {
            setFieldValue('task', "")
        }
        return () => {
            isCurrent = false;
        };
    }, [jobRole, setFieldValue, props.name, allTasks]);

    return (
        <>
            <Field  {...props} {...field} />
            {!!meta.touched && !!meta.error && <div>{meta.error}</div>}
        </>
    );
};

export default MyTasks;
