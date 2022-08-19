import React, {useEffect, useState} from 'react';
import Modal from 'react-modal';
import TasksForm from "./TasksForm";
import {checkResponseStatus} from "../../utils/helpers/responce-helpers";
import Alert from "../../components/Alert/Alert";

const Tasks = props => {
    const {loading, response, clearTasksResponse, getAllPresetTasksAndSkills, createOnePresetTasks, tasks} = props;
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [modalFormat, setModalFormat] = useState(null)
    const sortById = (arr) => arr.sort((a, b) => a.id > b.id ? 1 : -1);

    useEffect(() => {
        getAllPresetTasksAndSkills();
    }, [getAllPresetTasksAndSkills])

    useEffect(() => {
        sortById(tasks);
    }, [tasks])

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const createNewTask = () => {
        openModal();
        setModalFormat('create');
        setModalData({name: '', Skills: []})
    };

    const editTask = (tasks, taskId) => {
        openModal();
        setModalFormat('edit');
        setModalData(tasks[taskId])
    };

    const customStyles = {
        content: {
            maxWidth: 680
        },
    }

    return (
        <div className="app-content pb-4">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <h1 className="title">Tasks</h1>
                    </div>
                    <div className="col-12 col-md-6 mb-4">
                        <div
                            className="d-flex justify-content-center justify-content-md-end align-items-center">
                            <button className="btn btn--green"
                                    onClick={() => createNewTask()}>Create new task
                            </button>
                        </div>
                    </div>
                </div>
                <div className="white-shadow-box pb-1">
                    <div className="row">
                        {!loading && tasks.map((task, num) => (
                            <div key={task.id} className="col-12 col-lg-4 mb-4">
                                <div className="tasks">
                                    <div className="tasks__head task-box">
                                        <div className="tasks__title">{task.name}</div>
                                        <span className="edit"
                                              onClick={() => editTask(tasks, num)}>Edit</span>
                                    </div>
                                    <ul className="tasks-list">
                                        {task.Skills?.map(skill => (
                                            <li className="task-box bg-white" key={skill.id}>{skill.name}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Modal isOpen={modalIsOpen}
                   style={customStyles}
                   ariaHideApp={false}
                   contentLabel="Edit Tasks">
                <span className="icon-close" onClick={closeModal}/>
                <div className="modal-head">
                    <div className="modal-title">Task editing</div>
                </div>
                <div className="modal-body">
                    {modalFormat === 'create' && (
                        <TasksForm data={modalData}
                                   onSubmit={createOnePresetTasks}
                                   closeModal={closeModal}
                                   responce={response}
                                   clearTasksResponse={clearTasksResponse}/>
                    )}
                    {modalFormat === 'edit' && (
                        <TasksForm onSubmit={() => console.log('Edit()')}
                                   closeModal={closeModal}
                                   responce={response} data={modalData}
                                   clearTasksResponse={clearTasksResponse}/>
                    )}
                </div>
                <div className="mt-3">
                    {response && <Alert text={response.data.message} type={checkResponseStatus(response.status)}/>}
                </div>
            </Modal>
        </div>
    );
}

export default Tasks;
