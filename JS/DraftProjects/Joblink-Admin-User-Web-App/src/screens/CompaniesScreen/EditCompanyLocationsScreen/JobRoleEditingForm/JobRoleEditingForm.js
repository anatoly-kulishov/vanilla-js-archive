import React, {memo} from 'react';
import {Field, Form, Formik} from "formik";
import {useDispatch} from "react-redux";
import {fieldErrorClass} from "../../../../constants";
import validators from "../../../../utils/validators";

const JobRoleEditingForm = props => {
    const {onSubmit, data, companyId, closeModal} = props;

    // Other Hooks
    const dispatch = useDispatch();

    // From Initial Values
    const initialValues = {
        jobRoleName: data.name,
        accessDetails: data.accessDetails,
        contactPerson: data.contactPerson_FullName,
        contactPhone: data.contactPerson_Phone
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values, {setSubmitting}) => {
                console.log(JSON.stringify(values, null, 2));
                dispatch(onSubmit(data.id, companyId, values))
                setSubmitting(false);
                closeModal();
            }}>
            {({values, handleChange, errors, touched, handleSubmit, isSubmitting}) => (
                <Form onSubmit={handleSubmit} className="form">
                    <div className="row">
                        <div className="col-12">
                            <div className="form-row">
                                <label htmlFor="jobRoleName">Job role name</label>
                                <Field
                                    className={`form-control ${errors.jobRoleName && touched.jobRoleName && fieldErrorClass}`}
                                    type="text"
                                    id="jobRoleName"
                                    name="jobRoleName"
                                    value={values.jobRoleName}
                                    onChange={handleChange}
                                    validate={validators.required}/>
                            </div>
                            <div className="form-row">
                                <label htmlFor="accessDetails">Access details</label>
                                <Field
                                    className={`form-control ${errors.accessDetails && touched.accessDetails && fieldErrorClass}`}
                                    type="text"
                                    id="accessDetails"
                                    name="accessDetails"
                                    value={values.accessDetails}
                                    onChange={handleChange}
                                    validate={validators.required}/>
                            </div>
                            <div className="form-group">
                                <div className="form-row">
                                    <label htmlFor="contactPerson">Contact person</label>
                                    <Field
                                        className={`form-control ${errors.contactPerson && touched.contactPerson && fieldErrorClass}`}
                                        type="text"
                                        id="contactPerson"
                                        name="contactPerson"
                                        value={values.contactPerson}
                                        onChange={handleChange}
                                        validate={validators.required}/>
                                </div>
                                <div className="form-row">
                                    <label htmlFor="contactPhone">Contact phone</label>
                                    <Field
                                        className={`form-control ${errors.contactPhone && touched.contactPhone && fieldErrorClass}`}
                                        type="tel"
                                        id="contactPhone"
                                        name="contactPhone"
                                        value={values.contactPhone}
                                        onChange={handleChange}
                                        placeholder="0123456789"
                                        validate={validators.required}/>
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

export default memo(JobRoleEditingForm);
