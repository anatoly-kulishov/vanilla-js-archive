import React, {memo} from 'react';
import {Field, Form, Formik} from "formik";
import {useDispatch} from "react-redux";

const JobRoleCreatingForm = props => {
    const {locationId, companyId, onSubmit, closeModal} = props;

    // Other Hooks
    const dispatch = useDispatch();

    // From Initial Values
    const initialValues = {
        jobRoleName: "",
        accessDetails: "",
        contactPerson: "",
        contactPhone: ""
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values, {setSubmitting}) => {
                console.log(JSON.stringify(values, null, 2));
                dispatch(onSubmit(locationId, companyId, values))
                setSubmitting(false);
                closeModal();
            }}>
            {({values, handleChange, handleSubmit, isSubmitting}) => (
                <Form onSubmit={handleSubmit} className="form">
                    <div className="row">
                        <div className="col-12">
                            <div className="form-row">
                                <label htmlFor="jobRoleName">Job role name</label>
                                <Field className={`form-control`}
                                       type="text"
                                       id="jobRoleName"
                                       name="jobRoleName"
                                       value={values.jobRoleName}
                                       onChange={handleChange}/>
                            </div>
                            <div className="form-row">
                                <label htmlFor="accessDetails">Access details</label>
                                <Field className={`form-control`}
                                       type="text"
                                       id="accessDetails"
                                       name="accessDetails"
                                       value={values.accessDetails}
                                       onChange={handleChange}/>
                            </div>
                            <div className="form-group">
                                <div className="form-row">
                                    <label htmlFor="contactPerson">Contact person</label>
                                    <Field className={`form-control`}
                                           type="text"
                                           id="contactPerson"
                                           name="contactPerson"
                                           value={values.contactPerson}
                                           onChange={handleChange}/>
                                </div>
                                <div className="form-row">
                                    <label htmlFor="contactPhone">Contact phone</label>
                                    <Field className={`form-control`}
                                           type="tel"
                                           id="contactPhone"
                                           name="contactPhone"
                                           value={values.contactPhone}
                                           onChange={handleChange}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-footer">
                        <div className="form-row mt-40 mb-10">
                            <button className="btn btn--green btn--block mb-2" type="submit"
                                    disabled={isSubmitting}>
                                Save
                            </button>
                            <button type="button" className="btn btn--default btn--block"
                                    onClick={closeModal}>Cancel
                            </button>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
}

export default memo(JobRoleCreatingForm);
