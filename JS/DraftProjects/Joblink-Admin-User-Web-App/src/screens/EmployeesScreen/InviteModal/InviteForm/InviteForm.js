import React, {useEffect, useState} from 'react';
import {Formik, Form, Field} from 'formik';
import validators from "../../../../utils/validators";
import {fieldErrorClass} from "../../../../constants";
import Select from "react-select";
import {selectTheme} from "../../../../theme";

const InviteForm = props => {
    const {onSubmit, data, closeModal} = props;
    const [costCentersOptions, setCostCentersOptions] = useState(null)
    const [costCenterName, setCostCenterName] = useState({value: "all", label: "All Cost centers"});

    useEffect(() => {
        setCostCentersOptions(data.map(el => ({value: el?.name, label: el?.name})))
        setCostCentersOptions(prev => [{value: "all", label: "All Cost centers"}, ...prev])
    }, [data])

    const handleCostCenterNameChange = selectedOption => setCostCenterName(selectedOption);

    return (
        <Formik
            initialValues={{firstName: "", lastName: "", phone: "", email: ""}}
            onSubmit={(values, {setSubmitting, resetForm}) => {
                // console.log(JSON.stringify(values, null, 2));
                onSubmit({...values, costCenter: costCenterName.value});
                setSubmitting(false);
            }}>
            {({values, handleChange, errors, touched, handleSubmit, isSubmitting}) => (
                <Form onSubmit={handleSubmit} className="form">
                    <div className="form-group">
                        <div className="form-row">
                            <label htmlFor="firstName">First name</label>
                            <Field
                                className={`form-control ${errors.firstName && touched.firstName && fieldErrorClass}`}
                                type="text"
                                id="firstName"
                                name="firstName"
                                validate={validators.required}
                                value={values.firstName}
                                onChange={handleChange}/>
                        </div>
                        <div className="form-row">
                            <label htmlFor="lastName">Last name</label>
                            <Field className={`form-control ${errors.lastName && touched.lastName && fieldErrorClass}`}
                                   type="text"
                                   id="lastName"
                                   name="lastName"
                                   validate={validators.required}
                                   value={values.lastName}
                                   onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-row">
                            <label htmlFor="phone">Phone</label>
                            <Field className={`form-control ${errors.phone && touched.phone && fieldErrorClass}`}
                                   type="phone"
                                   id="phone"
                                   name="phone"
                                   validate={validators.required}
                                   value={values.phone}
                                   onChange={handleChange}/>
                        </div>
                        <div className="form-row">
                            <label htmlFor="email">Email</label>
                            <Field className={`form-control ${errors.email && touched.email && fieldErrorClass}`}
                                   type="email"
                                   id="email"
                                   name="email"
                                   validate={validators.required}
                                   value={values.email}
                                   onChange={handleChange}/>
                        </div>
                    </div>
                    <div>
                        <div className="select-box w-100 mb-3">
                            <label>
                                <span>Cost center name</span>
                                <Select
                                    value={costCenterName}
                                    onChange={handleCostCenterNameChange}
                                    options={costCentersOptions}
                                    theme={selectTheme}/>
                            </label>
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

export default InviteForm;
