import React from 'react';
import {Formik, Form, Field} from 'formik';
import DatePickerField from "../../../../components/DatePickerField";

const EditPastLeaveForm = props => {
    const {onSubmit, closeModal} = props;

    return (
        <Formik
            initialValues={{leaveType: "", startDate: new Date(), endDate: new Date()}}
            onSubmit={(values, {setSubmitting, resetForm}) => {
                // console.log(JSON.stringify(values, null, 2));
                onSubmit({...values});
                setSubmitting(false);
            }}>
            {({values, handleChange, handleSubmit, isSubmitting}) => (
                <Form onSubmit={handleSubmit} className="form">
                    <div className="form-group align-items-center">
                        <div className="count-row">
                            1.
                        </div>
                        <div className="form-row mr-3">
                            <label htmlFor="leaveType">Leave type</label>
                            <Field as="select"
                                   className="form-control"
                                   id="leaveType"
                                   name="leaveType">
                                <option value={'sick-leave'}
                                        label={'Sick leave'}>
                                </option>
                            </Field>
                        </div>
                        <div className="form-row mr-3">
                            <label htmlFor="startDate">Start date</label>
                            <DatePickerField name="startDate"
                                             dateFormat="dd/MM/yyyy"/>
                        </div>
                        <div className="form-row mr-2">
                            <label htmlFor="endDate">End date</label>
                            <DatePickerField name="endDate"
                                             dateFormat="dd/MM/yyyy"/>
                        </div>
                        <div className="decline-icon-box" onClick={() => console.log('delete()')}>
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M2.93414 2.93413L2.93413 2.93414C1.89441 3.97387 1.25 5.4124 1.25 7C1.25 8.5876 1.89441 10.0261 2.93413 11.0659L3.46446 10.5355L2.93414 11.0659C3.97387 12.1056 5.4124 12.75 7 12.75C8.5876 12.75 10.0261 12.1056 11.0659 11.0659C12.1056 10.0261 12.75 8.5876 12.75 7C12.75 5.4124 12.1056 3.97387 11.0659 2.93414L10.5355 3.46446L11.0659 2.93413C10.0261 1.89441 8.5876 1.25 7 1.25C5.4124 1.25 3.97387 1.89441 2.93414 2.93413Z"
                                    fill="#EF4444" stroke="#EF4444" strokeWidth="1.5" strokeLinejoin="round"/>
                                <path
                                    d="M4.85714 4L4 4.85713L6.14292 7L4 9.14288L4.85714 10L7.00006 7.85713L9.14286 9.99988L10 9.14275L7.8572 7L10 4.85725L9.14286 4.00012L7.00006 6.14287L4.85714 4Z"
                                    fill="white"/>
                            </svg>
                        </div>
                    </div>
                    <div className="form-footer">
                        <div className="form-row mt-4 mb-2">
                            <button className="btn btn--green" type="submit" disabled={isSubmitting}>
                                Send
                            </button>
                        </div>
                        <div className="form-row mt-2 mb-0">
                            <button className="btn btn--default" onClick={() => closeModal()} type="button">
                                Cancel
                            </button>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
}

export default EditPastLeaveForm;
