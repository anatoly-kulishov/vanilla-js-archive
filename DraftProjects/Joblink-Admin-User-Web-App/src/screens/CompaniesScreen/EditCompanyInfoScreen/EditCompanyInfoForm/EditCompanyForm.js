import React from 'react';
import {Formik, Form} from 'formik';
import {Link} from "react-router-dom";

const EditCompanyForm = props => {
    const {initialData, onSubmit} = props;

    const initialValues = {
        name: initialData.name,
        businessId: initialData.businessId,
        invoicingAddress_Street: initialData.invoicingAddress_Street,
        invoicingAddress_ZipCode: initialData.invoicingAddress_ZipCode,
        invoicingAddress_City: initialData.invoicingAddress_City,
        eInvoicingAddress_OperatorName: initialData.eInvoicingAddress_OperatorName,
        eInvoicingAddress_OperatorCode: initialData.eInvoicingAddress_OperatorCode,
        eInvoicingAddress_Address: initialData.eInvoicingAddress_Address,
        eInvoicingAddress_OVTCode: initialData.eInvoicingAddress_OVTCode,
        contactPerson_FullName: initialData.contactPerson_FullName,
        contactPerson_Phone: initialData.contactPerson_Phone,
        contactPerson_Email: initialData.contactPerson_Email,
    }

    const onDeleteAccount = () => console.log('onDeleteAccount()');

    console.log(initialData.id)

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values, {setSubmitting}) => {
                console.log(JSON.stringify(values, null, 2));
                onSubmit(initialData.id, values, setSubmitting)
            }}>
            {({values, handleChange, isSubmitting, handleSubmit}) => (
                <Form onSubmit={handleSubmit} className="form editing-company-form">
                    <div className="form__body">
                        <div className="form-group">
                            <div className="form-row mr-4 w-100">
                                <label htmlFor="name">Company name</label>
                                <input type="text"
                                       className="form-control"
                                       id="name"
                                       name="name"
                                       value={values.name}
                                       onChange={handleChange}/>
                            </div>
                            <div className="form-row w-100">
                                <label htmlFor="businessId">Business ID</label>
                                <input type="text"
                                       className="form-control"
                                       id="businessId"
                                       name="businessId"
                                       value={values.businessId}
                                       onChange={handleChange}/>
                            </div>
                        </div>
                        <div className="caption">
                            <div className="row">
                                <div className="col-12">
                                    <div className="caption__title">Invoicing address</div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-row mr-4 w-100">
                                    <label htmlFor="invoicingAddress_Street">Street</label>
                                    <input type="text"
                                           className="form-control"
                                           id="invoicingAddress_Street"
                                           name="invoicingAddress_Street"
                                           value={values.invoicingAddress_Street}
                                           onChange={handleChange}/>
                                </div>
                                <div className="form-row mr-4 w-100">
                                    <label htmlFor="invoicingAddress_ZipCode">Postal Code</label>
                                    <input type="text"
                                           className="form-control"
                                           id="invoicingAddress_ZipCode"
                                           name="invoicingAddress_ZipCode"
                                           value={values.invoicingAddress_ZipCode}
                                           onChange={handleChange}/>
                                </div>
                                <div className="form-row w-100">
                                    <label htmlFor="invoicingAddress_City">City</label>
                                    <input type="text"
                                           className="form-control"
                                           id="invoicingAddress_City"
                                           name="invoicingAddress_City"
                                           value={values.invoicingAddress_City}
                                           onChange={handleChange}/>
                                </div>
                            </div>
                        </div>
                        <div className="caption">
                            <div className="row">
                                <div className="col-12">
                                    <div className="caption__title">E-Invoicing address</div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-row mr-4 w-100">
                                    <label htmlFor="eInvoicingAddress_OperatorName">Operator name</label>
                                    <input type="text"
                                           className="form-control"
                                           id="eInvoicingAddress_OperatorName"
                                           name="eInvoicingAddress_OperatorName"
                                           value={values.eInvoicingAddress_OperatorName}
                                           onChange={handleChange}/>
                                </div>
                                <div className="form-row mr-4 w-100">
                                    <label htmlFor="eInvoicingAddress_OperatorCode">Operator code</label>
                                    <input type="text"
                                           className="form-control"
                                           id="eInvoicingAddress_OperatorCode"
                                           name="eInvoicingAddress_OperatorCode"
                                           value={values.eInvoicingAddress_OperatorCode}
                                           onChange={handleChange}/>
                                </div>
                                <div className="form-row w-100">
                                    <label htmlFor="eInvoicingAddress_OVTCode">OVT code</label>
                                    <input type="text"
                                           className="form-control"
                                           id="eInvoicingAddress_OVTCode"
                                           name="eInvoicingAddress_OVTCode"
                                           value={values.eInvoicingAddress_OVTCode}
                                           onChange={handleChange}/>
                                </div>
                            </div>
                            <div className="form-row mr-4 pb-3 w-100">
                                <label htmlFor="eInvoicingAddress_Address">Address</label>
                                <input type="text"
                                       className="form-control"
                                       id="eInvoicingAddress_Address"
                                       name="eInvoicingAddress_Address"
                                       value={values.eInvoicingAddress_Address}
                                       onChange={handleChange}/>
                            </div>
                        </div>
                        <div className="caption">
                            <div className="row">
                                <div className="col-12">
                                    <div className="caption__title">Contact person</div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-row mr-4 w-100">
                                    <label htmlFor="contactPerson_FullName">Name</label>
                                    <input type="text"
                                           className="form-control"
                                           id="contactPerson_FullName"
                                           name="contactPerson_FullName"
                                           value={values.contactPerson_FullName}
                                           onChange={handleChange}/>
                                </div>
                                <div className="form-row mr-4 w-100">
                                    <label htmlFor="contactPerson_Phone">Phone</label>
                                    <input type="tel"
                                           className="form-control"
                                           id="contactPerson_Phone"
                                           name="contactPerson_Phone"
                                           value={values.contactPerson_Phone}
                                           onChange={handleChange}/>
                                </div>
                                <div className="form-row w-100">
                                    <label htmlFor="contactPerson_Email">Email</label>
                                    <input type="email"
                                           className="form-control"
                                           id="contactPerson_Email"
                                           name="contactPerson_Email"
                                           value={values.contactPerson_Email}
                                           onChange={handleChange}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-footer">
                        <div className="mt-4 mb-10">
                            <div className="d-md-flex justify-content-between align-items-center">
                                <div className="btn-group">
                                    <button className="btn btn--green" disabled={isSubmitting} type="submit">
                                        Save
                                    </button>
                                    <Link className="btn btn--default" to="/accounts-companies">Cancel</Link>
                                </div>
                                <button type="button"
                                        className="btn btn-md-block btn--light-danger btn--disabled" disabled
                                        onClick={onDeleteAccount}>Delete account
                                </button>
                            </div>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default EditCompanyForm;
