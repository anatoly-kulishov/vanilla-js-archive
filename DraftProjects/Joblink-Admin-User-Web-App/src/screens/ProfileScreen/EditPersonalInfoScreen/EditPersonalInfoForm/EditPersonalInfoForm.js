import React from 'react';
import {useHistory} from "react-router-dom";
import {Formik, Form, Field} from 'formik';
import validators from "../../../../utils/validators";
import {fieldErrorClass} from "../../../../constants";
import {useDispatch} from "react-redux";

const EditPersonalInfoForm = props => {
    const {onSubmit, data, accountId} = props;
    const dispatch = useDispatch();
    const history = useHistory();

    const initialValues = {
        phone: data?.phone,
        email: data?.email,
        CostCenterId: data?.CostCenterId,
        bankAccount: data?.bankAccount,
        idNumber: data?.idNumber,
        clothingSize: data?.clothingSize,
        address_Street: data?.address_Street,
        address_ZipCode: data?.address_ZipCode,
        address_City: data?.address_City
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values, {setSubmitting}) => {
                console.log(JSON.stringify(values, null, 2));
                dispatch(onSubmit(data.id, values))
                setSubmitting(false);
            }}>
            {({values, handleChange, errors, touched, handleSubmit, isSubmitting}) => (
                <Form onSubmit={handleSubmit} className="form">
                    <div className="white-shadow-box mb-3 pb-3 pt-3">
                        <div className="form-group">
                            <div className="form-row w-100">
                                <label htmlFor="phone">Phone</label>
                                <Field
                                    className={`form-control ${errors.phone && touched.phone && fieldErrorClass}`}
                                    type="text"
                                    id="phone"
                                    name="phone"
                                    validate={validators.required}
                                    value={values.phone}
                                    onChange={handleChange}/>
                            </div>
                            <div className="form-row w-100 mr-3">
                                <label htmlFor="email">Email</label>
                                <Field
                                    className={`form-control ${errors.email && touched.email && fieldErrorClass}`}
                                    type="text"
                                    id="email"
                                    name="email"
                                    validate={validators.required}
                                    value={values.email}
                                    onChange={handleChange}/>
                            </div>
                            <div className="form-row w-100">
                                <label htmlFor="CostCenterId">Cost center</label>
                                <Field
                                    className={`form-control ${errors.CostCenterId && touched.CostCenterId && fieldErrorClass}`}
                                    type="text"
                                    id="CostCenterId"
                                    name="CostCenterId"
                                    validate={validators.required}
                                    value={values.CostCenterId}
                                    onChange={handleChange}/>
                            </div>
                        </div>
                        <div className="form-group mb-3">
                            <div className="form-row w-100 mr-3">
                                <label htmlFor="bankAccount">Bank account</label>
                                <Field
                                    className={`form-control ${errors.bankAccount && touched.bankAccount && fieldErrorClass}`}
                                    type="text"
                                    id="bankAccount"
                                    name="bankAccount"
                                    validate={validators.required}
                                    value={values.bankAccount}
                                    onChange={handleChange}/>
                            </div>
                            <div className="form-row w-100 mr-3">
                                <label htmlFor="idNumber">ID Number</label>
                                <Field
                                    className={`form-control ${errors.idNumber && touched.idNumber && fieldErrorClass}`}
                                    type="text"
                                    id="idNumber"
                                    name="idNumber"
                                    validate={validators.required}
                                    value={values.idNumber}
                                    onChange={handleChange}/>
                            </div>
                            <div className="form-row w-100">
                                <label htmlFor="clothingSize">Clothing size</label>
                                <Field
                                    className={`form-control ${errors.clothingSize && touched.clothingSize && fieldErrorClass}`}
                                    type="text"
                                    id="clothingSize"
                                    name="clothingSize"
                                    validate={validators.required}
                                    value={values.clothingSize}
                                    onChange={handleChange}/>
                            </div>
                        </div>
                        <div>
                            <div className="section-title text-bold">Home address</div>
                            <div className="form-group">
                                <div className="form-row w-100 mb-0 mr-3">
                                    <label htmlFor="address_Street">Street</label>
                                    <Field
                                        className={`form-control ${errors.address_Street && touched.address_Street && fieldErrorClass}`}
                                        type="text"
                                        id="address_Street"
                                        name="address_Street"
                                        validate={validators.required}
                                        value={values.address_Street}
                                        onChange={handleChange}/>
                                </div>
                                <div className="form-row w-100  mb-0 mr-3">
                                    <label htmlFor="address_ZipCode">Postal Code</label>
                                    <Field
                                        className={`form-control ${errors.address_ZipCode && touched.address_ZipCode && fieldErrorClass}`}
                                        type="text"
                                        id="address_ZipCode"
                                        name="address_ZipCode"
                                        validate={validators.required}
                                        value={values.address_ZipCode}
                                        onChange={handleChange}/>
                                </div>
                                <div className="form-row w-100  mb-0">
                                    <label htmlFor="address_City">City</label>
                                    <Field
                                        className={`form-control ${errors.address_City && touched.address_City && fieldErrorClass}`}
                                        type="text"
                                        id="address_City"
                                        name="address_City"
                                        validate={validators.required}
                                        value={values.address_City}
                                        onChange={handleChange}/>
                                </div>
                            </div>
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
                </Form>
            )}
        </Formik>
    );
}

export default EditPersonalInfoForm;
