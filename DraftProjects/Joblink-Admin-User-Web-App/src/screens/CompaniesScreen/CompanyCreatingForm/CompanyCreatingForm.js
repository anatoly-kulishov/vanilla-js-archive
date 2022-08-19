import React, {memo} from 'react';
import {useDispatch} from "react-redux";
import {Field, Form, Formik} from "formik";
import {fieldErrorClass} from "../../../constants";
import validators from "../../../utils/validators";

const CompanyCreatingForm = props => {
    const {onSubmit, closeModal} = props;

    // Other Hooks
    const dispatch = useDispatch();

    // Form => Initial Values
    const initialValues = {
        name: "",
        businessId: "",
        invoicingAddress_Street: "",
        invoicingAddress_ZipCode: "",
        invoicingAddress_City: "",
        eInvoicingAddress_OperatorName: "",
        eInvoicingAddress_OperatorCode: "",
        eInvoicingAddress_OVTCode: "",
        eInvoicingAddress_Address: "",
        contactPerson_FullName: "",
        contactPerson_Phone: "",
        contactPerson_Email: ""
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values, {setSubmitting}) => {
                console.log(JSON.stringify(values, null, 2));
                dispatch(onSubmit(values))
                setSubmitting(false);
                closeModal();
            }}>
            {({values, handleChange, handleSubmit, errors, touched, isSubmitting}) => (
                <Form onSubmit={handleSubmit} className="form">
                    <div className="row">
                        <div className="col-12">
                            <div className="form-group">
                                <div className="form-row w-100">
                                    <label htmlFor="name">Company Name</label>
                                    <Field
                                        className={`form-control ${errors.name && touched.name && fieldErrorClass}`}
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={values.name}
                                        onChange={handleChange}
                                        validate={validators.required}/>
                                </div>
                                <div className="form-row w-100">
                                    <label htmlFor="businessId">Business ID</label>
                                    <Field
                                        className={`form-control ${errors.businessId && touched.businessId && fieldErrorClass}`}
                                        type="text"
                                        id="businessId"
                                        name="businessId"
                                        value={values.businessId}
                                        onChange={handleChange}
                                        validate={validators.required}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-row mr-3 w-100">
                                    <label htmlFor="eInvoicingAddress_OperatorName">Operator name</label>
                                    <Field type="text"
                                           className={`form-control ${errors.eInvoicingAddress_OperatorName && touched.eInvoicingAddress_OperatorName && fieldErrorClass}`}
                                           id="eInvoicingAddress_OperatorName"
                                           name="eInvoicingAddress_OperatorName"
                                           value={values.eInvoicingAddress_OperatorName}
                                           onChange={handleChange}
                                           validate={validators.required}/>
                                </div>
                                <div className="form-row w-100">
                                    <label htmlFor="eInvoicingAddress_OperatorCode">Operator code</label>
                                    <Field
                                        className={`form-control ${errors.eInvoicingAddress_OperatorCode && touched.eInvoicingAddress_OperatorCode && fieldErrorClass}`}
                                        type="text"
                                        id="eInvoicingAddress_OperatorCode"
                                        name="eInvoicingAddress_OperatorCode"
                                        value={values.eInvoicingAddress_OperatorCode}
                                        onChange={handleChange}
                                        validate={validators.required}/>

                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-row w-100">
                                    <label htmlFor="eInvoicingAddress_Address">Address</label>
                                    <Field
                                        className={`form-control ${errors.eInvoicingAddress_Address && touched.eInvoicingAddress_Address && fieldErrorClass}`}
                                        type="text"
                                        id="eInvoicingAddress_Address"
                                        name="eInvoicingAddress_Address"
                                        value={values.eInvoicingAddress_Address}
                                        onChange={handleChange}
                                        validate={validators.required}/>
                                </div>
                                <div className="form-row w-100">
                                    <label htmlFor="eInvoicingAddress_OVTCode">OVT code</label>
                                    <Field type="text"
                                           className={`form-control ${errors.eInvoicingAddress_OVTCode && touched.eInvoicingAddress_OVTCode && fieldErrorClass}`}
                                           id="eInvoicingAddress_OVTCode"
                                           name="eInvoicingAddress_OVTCode"
                                           value={values.eInvoicingAddress_OVTCode}
                                           onChange={handleChange}
                                           validate={validators.required}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-row w-100">
                                    <label htmlFor="invoicingAddress_City">City</label>
                                    <Field
                                        className={`form-control ${errors.invoicingAddress_City && touched.invoicingAddress_City && fieldErrorClass}`}
                                        type="text"
                                        id="invoicingAddress_City"
                                        name="invoicingAddress_City"
                                        value={values.invoicingAddress_City}
                                        onChange={handleChange}
                                        validate={validators.required}/>
                                </div>
                                <div className="form-row mr-3 w-100">
                                    <label htmlFor="invoicingAddress_Street">Street</label>
                                    <Field
                                        className={`form-control ${errors.invoicingAddress_Street && touched.invoicingAddress_Street && fieldErrorClass}`}
                                        type="text"
                                        id="invoicingAddress_Street"
                                        name="invoicingAddress_Street"
                                        value={values.invoicingAddress_Street}
                                        onChange={handleChange}
                                        validate={validators.required}/>

                                </div>
                                <div className="form-row w-100">
                                    <label htmlFor="invoicingAddress_ZipCode">Postal Code</label>
                                    <Field type="text"
                                           className={`form-control ${errors.invoicingAddress_ZipCode && touched.invoicingAddress_ZipCode && fieldErrorClass}`}
                                           id="invoicingAddress_ZipCode"
                                           name="invoicingAddress_ZipCode"
                                           value={values.invoicingAddress_ZipCode}
                                           onChange={handleChange}
                                           validate={validators.required}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-row mr-3 w-100">
                                    <label htmlFor="contactPerson_FullName">Name</label>
                                    <Field
                                        className={`form-control ${errors.contactPerson_FullName && touched.contactPerson_FullName && fieldErrorClass}`}
                                        type="text"
                                        id="contactPerson_FullName"
                                        name="contactPerson_FullName"
                                        value={values.contactPerson_FullName}
                                        onChange={handleChange}
                                        validate={validators.required}/>

                                </div>
                                <div className="form-row mr-3 w-100">
                                    <label htmlFor="contactPerson_Phone">Phone</label>
                                    <Field type="text"
                                           className={`form-control ${errors.contactPerson_Phone && touched.contactPerson_Phone && fieldErrorClass}`}
                                           id="contactPerson_Phone"
                                           name="contactPerson_Phone"
                                           value={values.contactPerson_Phone}
                                           onChange={handleChange}
                                           validate={validators.required}/>
                                </div>
                                <div className="form-row w-100">
                                    <label htmlFor="contactPerson_Email">Email</label>
                                    <Field type="email"
                                           className={`form-control ${errors.contactPerson_Email && touched.contactPerson_Email && fieldErrorClass}`}
                                           id="contactPerson_Email"
                                           name="contactPerson_Email"
                                           value={values.contactPerson_Email}
                                           onChange={handleChange}
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

export default memo(CompanyCreatingForm);
