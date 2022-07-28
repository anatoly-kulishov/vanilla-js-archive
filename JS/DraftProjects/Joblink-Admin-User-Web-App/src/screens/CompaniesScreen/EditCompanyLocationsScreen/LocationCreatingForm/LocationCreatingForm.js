import React, {memo, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Field, Form, Formik} from "formik";
import Select from "react-select";
import {selectTheme} from "../../../../theme";
import {getAllCostCenters} from "../../../../store/selectors/cost-centers-selectors";
import {fieldErrorClass} from "../../../../constants";
import validators from "../../../../utils/validators";

const LocationCreatingForm = props => {
    const {onSubmit, closeModal, companyId} = props;

    // Other Hooks
    const dispatch = useDispatch();

    // Selectors
    const costCenters = useSelector(getAllCostCenters);

    // States
    const [costCentersOptions, setCostCentersOptions] = useState(null);
    const [costCenter, setCostCenter] = useState(null);

    // Form => Initial Values
    const initialValues = {
        locationName: "",
        addressStreet: "",
        addressZipCode: "",
        addressCity: "",
    }

    // Actions
    const handleCostCenterNameChange = selectedOption => setCostCenter(selectedOption);

    // Side Effects
    useEffect(() => {
        setCostCentersOptions(costCenters.map(el => ({value: el?.id, label: el?.name})))
    }, [costCenters])

    useEffect(() => {
        setCostCenter(costCentersOptions?.[0])
    }, [costCentersOptions])


    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values, {setSubmitting}) => {
                console.log(JSON.stringify(values, null, 2));
                dispatch(onSubmit(Number(companyId), costCenter?.value, values))
                setSubmitting(false);
                closeModal();
            }}>
            {({values, handleChange, handleSubmit, errors, touched, isSubmitting}) => (
                <Form onSubmit={handleSubmit} className="form">
                    <div className="row">
                        <div className="col-12">
                            <div className="form-row">
                                <label htmlFor="locationName">Location Name</label>
                                <Field
                                    className={`form-control ${errors.locationName && touched.locationName && fieldErrorClass}`}
                                    type="text"
                                    id="locationName"
                                    name="locationName"
                                    value={values.locationName}
                                    onChange={handleChange}
                                    validate={validators.required}/>
                            </div>
                            <div className="form-row">
                                <label htmlFor="addressStreet">Address Street</label>
                                <Field
                                    className={`form-control ${errors.addressStreet && touched.addressStreet && fieldErrorClass}`}
                                    type="text"
                                    id="addressStreet"
                                    name="addressStreet"
                                    value={values.addressStreet}
                                    onChange={handleChange}
                                    validate={validators.required}/>
                            </div>
                            <div className="form-row">
                                <div className="select-box">
                                    <label className="w-100">
                                        <span>Cost center name</span>
                                        <Select
                                            value={costCenter}
                                            onChange={handleCostCenterNameChange}
                                            options={costCentersOptions}
                                            theme={selectTheme}/>
                                    </label>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-row">
                                    <label htmlFor="addressZipCode">Address Zip Code</label>
                                    <Field
                                        className={`form-control ${errors.addressZipCode && touched.addressZipCode && fieldErrorClass}`}
                                        type="text"
                                        id="addressZipCode"
                                        name="addressZipCode"
                                        value={values.addressZipCode}
                                        onChange={handleChange}
                                        validate={validators.required}/>
                                </div>
                                <div className="form-row">
                                    <label htmlFor="addressCity">Address City</label>
                                    <Field
                                        className={`form-control ${errors.addressCity && touched.addressCity && fieldErrorClass}`}
                                        type="text"
                                        id="addressCity"
                                        name="addressCity"
                                        value={values.addressCity}
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

export default memo(LocationCreatingForm);
