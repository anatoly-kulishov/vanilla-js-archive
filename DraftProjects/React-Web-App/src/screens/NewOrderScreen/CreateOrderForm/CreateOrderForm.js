import React, {useEffect} from 'react';
import {Form, Formik, Field, useFormikContext} from "formik";
import {useDispatch} from "react-redux";
import {createNewOrder} from "../../../store/actions/ordersActions";
import DatePickerField from "../../../components/DatePickerField";
import MyCompanies from "../MyFields/MyCompanies";
import MyJobRoles from "../MyFields/MyJobRoles";
import MyLocations from "../MyFields/MyLocations";
import MyTasks from "../MyFields/MyTasks";

const SelectAllSkillsToggle = () => {
    const {setFieldValue, values} = useFormikContext();

    useEffect(() => {
        if (values.selectAllSkills) {
            setFieldValue('eventSkills', JSON.parse(localStorage.getItem('requiredSkills'))?.map(({id}) => String(id)));
        } else {
            setFieldValue('eventSkills', []);
        }
        // eslint-disable-next-line
    }, [values.selectAllSkills])

    return null
}

const CreateOrderForm = ({costCenters}) => {
    const dispatch = useDispatch();

    const initialValues = {
        costCenter: '',
        location: '',
        company: '',
        jobRole: '',
        task: '',
        startTime: new Date(),
        endTime: new Date(),
        irregularTask: false,
        JobEndsInNextDay: false,
        eventSkills: [],
        description: '',
        OfferAccepted: false,
        selectAllSkills: false
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values, {setSubmitting}) => {
                console.log(JSON.stringify(values, null, 2));
                dispatch(createNewOrder(values))
                setSubmitting(false);
            }}>
            {({values, handleChange, handleSubmit, isSubmitting}) => (
                <Form onSubmit={handleSubmit} className="white-shadow-box pb-4">
                    <div className="form__body">
                        <div className="form-group">
                            <div className="form-row w-100">
                                <div className="select-box">
                                    <label htmlFor="costCenter">Cost center</label>
                                    <Field as="select" id="costCenter"
                                           name="costCenter"
                                           className="form-control"
                                           value={values.costCenter}
                                           onChange={handleChange}>
                                        <option value="" label="Select a cost center">
                                            cost center{" "}
                                        </option>
                                        {costCenters?.map(costCenter => (
                                            <option
                                                key={costCenter.id}
                                                value={costCenter.id}
                                                label={costCenter.name}/>
                                        ))}
                                    </Field>
                                </div>
                            </div>
                            <div className="form-row mr-4 w-100">
                                <div className="select-box">
                                    <label htmlFor="location">Location</label>
                                    <MyLocations as="select"
                                                 id="location"
                                                 name="location"
                                                 className="form-control"
                                                 disabled={!values.costCenter}
                                                 costcenters={costCenters}>
                                        <option value="" label="Select a location">
                                            Select a location{" "}
                                        </option>
                                        {
                                            JSON.parse(localStorage.getItem('location'))?.map(location => (
                                                <option key={location.id}
                                                        value={location.id}
                                                        label={location.name}
                                                />
                                            ))
                                        }
                                    </MyLocations>
                                </div>
                            </div>
                            <div className="form-row mr-4 w-100">
                                <div className="select-box">
                                    <label htmlFor="company">Company</label>
                                    <MyCompanies
                                        id="company"
                                        name="company"
                                        className="form-control"
                                        placeholder="Selected a company"
                                        disabled>
                                    </MyCompanies>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-row mr-4 w-100">
                                <div className="select-box">
                                    <label htmlFor="jobRole">Job role</label>
                                    <MyJobRoles as="select"
                                                className="form-control"
                                                id="jobRole"
                                                name="jobRole"
                                                disabled={!values.company}>
                                        <option value="" label="Select a job role">
                                            Select a job role{" "}
                                        </option>
                                        {
                                            JSON.parse(localStorage.getItem('companyAccount'))?.JobRoles?.map(jobRole => (
                                                <option key={jobRole.id}
                                                        value={jobRole.id}
                                                        label={jobRole.name}/>
                                            ))
                                        }
                                    </MyJobRoles>
                                </div>
                            </div>
                            <div className="form-row w-100">
                                <div className="select-box">
                                    <label htmlFor="task">Task</label>
                                    <MyTasks as="select"
                                             id="task"
                                             name="task"
                                             className="form-control"
                                             onChange={handleChange}
                                             disabled={!values.jobRole}>
                                        <option value="" label="Select a task">
                                            task{" "}
                                        </option>
                                        {
                                            JSON.parse(localStorage.getItem('tasks'))?.map((task, i) => (
                                                <option key={task.id}
                                                        value={task.id}
                                                        label={JSON.parse(localStorage.getItem('tasksForGettingNames'))?.[i]?.name}/>
                                            ))
                                        }
                                    </MyTasks>
                                </div>
                                <div className="checkboxes-item">
                                    <div className="checkboxes-item">
                                        <label
                                            className="custom-checkbox custom-checkbox--default-color mt-2 ml-0">
                                            <Field type="checkbox"
                                                   name="irregularTask"
                                                   disabled={!values.jobRole}/>
                                            <span className="ml-1">Irregular Task</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-row mr-4 w-100">
                                <label htmlFor="start-time">Start time</label>
                                <DatePickerField name="startTime"
                                                 showTimeSelect
                                                 dateFormat="dd/MM/yyyy h:mm aa"/>
                            </div>
                            <div className="form-row w-100">
                                <label htmlFor="end-time">End time</label>
                                <DatePickerField name="endTime"
                                                 showTimeSelect
                                                 dateFormat="dd/MM/yyyy h:mm aa"/>
                                <div className="checkboxes-item">
                                    <label
                                        className="custom-checkbox custom-checkbox--default-color mt-2 ml-0">
                                        <Field type="checkbox" name="JobEndsInNextDay"/>
                                        <span className="ml-1">Job ends in next day</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-row mr-4 w-100">
                                <SelectAllSkillsToggle/>
                                <label className="mb-2">Required skills</label>
                                <div className="required-skills-column" role="group"
                                     aria-labelledby="checkbox-group">
                                    <label
                                        className={`d-block mb-1 select-all custom-checkbox ${!values.task && 'disabled'}`}>
                                        <Field
                                            type="checkbox"
                                            name="selectAllSkills"
                                            disabled={!values.task}
                                        />
                                        <span className="ml-2">Select all</span>
                                    </label>
                                    {
                                        JSON.parse(localStorage.getItem('requiredSkills'))?.map(el => (
                                            <label className="d-block mb-1 custom-checkbox"
                                                   key={el.id}>
                                                <Field
                                                    type="checkbox"
                                                    name="eventSkills"
                                                    value={`${el.id}`}
                                                />
                                                <span className="ml-2">{el.name}</span>
                                            </label>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="form-row w-100">
                                <label className="ml-0" htmlFor="description">Description</label>
                                <Field as="textarea"
                                       id="description"
                                       name="description"
                                       className="form-control h-350"
                                       value={values.description}
                                       onChange={handleChange}
                                       placeholder="Type message here..."
                                       required/>
                            </div>
                        </div>
                    </div>
                    <div className="form-footer">
                        <div className="mt-4">
                            <div className="form-group align-items-center">
                                <button className="btn btn--green" type="submit"
                                        disabled={isSubmitting}>Send
                                </button>
                                <div className="checkboxes-item ml-md-1">
                                    <label
                                        className="custom-checkbox custom-checkbox--default-color mt-4 mt-md-2 ml-0">
                                        <Field type="checkbox" name="OfferAccepted"/>
                                        <span className="ml-1">Send notification when Job Offer will be Accepted</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default CreateOrderForm;
