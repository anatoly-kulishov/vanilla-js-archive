import React, {useEffect} from 'react';
import {Formik, Form, Field} from 'formik';

const TasksForm = props => {
    const {onSubmit, data, closeModal, clearTasksResponse} = props;

    useEffect(() => {
        return () => clearTasksResponse()
    }, [clearTasksResponse])

    return (
        <Formik
            initialValues={{taskName: data.name, skills: data.Skills}}
            onSubmit={(values, {setSubmitting}) => {
                console.log(JSON.stringify(values, null, 2));
                onSubmit(values)
                setSubmitting(false);
            }}>
            {({values, handleChange, handleSubmit, isSubmitting}) => (
                <Form onSubmit={handleSubmit} className="form">
                    <div className="form-row">
                        <label htmlFor="taskName">Task name</label>
                        <Field className={`form-control`}
                               type="text"
                               id="taskName"
                               name="taskName"
                               value={values.taskName}
                               onChange={handleChange}/>
                    </div>
                    <div className="form-row w-100">
                        <label>Skills list</label>
                        <div className="checkboxes">
                            <div role="group" aria-labelledby="checkbox-group">
                                {data?.Skills.map(skill => {
                                    return (
                                        <div className="checkboxes-item" key={skill.id}>
                                            <label className="custom-checkbox">
                                                <Field
                                                    type="checkbox"
                                                    name={`skills`}
                                                    value={skill.name}
                                                    onChange={handleChange}/>
                                                <span>{skill.name}</span>
                                            </label>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="form-footer">
                        <div className="form-row mt-40 mb-10">
                            <button className="btn btn--green" type="submit" disabled={isSubmitting}>
                                Save
                            </button>
                        </div>
                        <div className="form-row mb-0">
                            <div className="btn-group">
                                <button type="button" className="btn btn--light-danger btn--block"
                                        onClick={() => console.log(`deleteTask(${data.id})`)}>Delete task
                                </button>
                                <button type="button" className="btn btn--default btn--block"
                                        onClick={closeModal}>Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
}

export default TasksForm;
