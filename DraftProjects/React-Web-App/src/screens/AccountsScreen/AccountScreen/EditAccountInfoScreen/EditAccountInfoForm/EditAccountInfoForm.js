import React from 'react';
import {Formik, Form, Field} from 'formik';
import validators from "../../../../../utils/validators";
import {fieldErrorClass} from "../../../../../constants";
import {useHistory} from "react-router-dom";

const EditAccountInfoForm = props => {
    const {onSubmit, data, accountId} = props;
    const history = useHistory();

    return (
        <Formik
            initialValues={{firstName: data.firstName, lastName: data.lastName, email: data.email, phone: data.phone}}
            onSubmit={(values, {setSubmitting}) => {
                console.log(JSON.stringify(values, null, 2));
                onSubmit(accountId, values)
                setSubmitting(false);
            }}>
            {({values, handleChange, errors, touched, handleSubmit, isSubmitting}) => (
                <Form onSubmit={handleSubmit} className="form">
                    <div className="white-shadow-box mb-3 pb-3 pt-3">
                        <div className="form-group">
                            <div className="form-row w-100">
                                <label htmlFor="firstName">First Name</label>
                                <Field
                                    className={`form-control ${errors.email && touched.email && fieldErrorClass}`}
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    validate={validators.required}
                                    value={values.firstName}
                                    onChange={handleChange}/>
                            </div>
                            <div className="form-row w-100">
                                <label htmlFor="lastName">Last name</label>
                                <Field
                                    className={`form-control ${errors.phone && touched.phone && fieldErrorClass}`}
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    validate={validators.required}
                                    value={values.lastName}
                                    onChange={handleChange}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-row w-100">
                                <label htmlFor="email">Email</label>
                                <Field
                                    className={`form-control ${errors.email && touched.email && fieldErrorClass}`}
                                    type="email"
                                    id="email"
                                    name="email"
                                    validate={validators.required}
                                    value={values.email}
                                    onChange={handleChange}/>
                            </div>
                            <div className="form-row w-100">
                                <label htmlFor="lastName">Phone</label>
                                <Field className={`form-control ${errors.phone && touched.phone && fieldErrorClass}`}
                                       type="tel"
                                       id="phone"
                                       name="phone"
                                       validate={validators.required}
                                       value={values.phone}
                                       onChange={handleChange}/>
                            </div>
                        </div>
                        <div className="form-footer d-flex justify-content-between align-items-center">
                            <div className="btn-group">
                                <button className="btn btn--green" type="submit" disabled={isSubmitting}>
                                    Send
                                </button>
                                <button className="btn btn--default" onClick={history.goBack} type="button">
                                    Cancel
                                </button>
                            </div>
                            <button type="button" className="btn btn--light-danger btn--disabled"
                                    onClick={() => console.log(`deleteAccount(${accountId})`)}>Delete account
                            </button>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
}

export default EditAccountInfoForm;
