import React from 'react';
import {Formik, Form, Field} from 'formik';
import {useDispatch} from "react-redux";
import {abortOneJobOffer, cancelOneJobOffer} from "../../../../store/actions/ordersActions";

const CancelOrAbortForm = props => {
    const {id, closeModal, modalFormat} = props;
    const dispatch = useDispatch();

    return (
        <Formik
            initialValues={{reasons: ''}}
            onSubmit={(values, {setSubmitting}) => {
                console.log(JSON.stringify(values, null, 2));
                if (modalFormat === 'cancel') dispatch(cancelOneJobOffer(id))
                if (modalFormat === 'abort') dispatch(abortOneJobOffer(id))
                setSubmitting(false);
            }}>
            {({values, handleChange, handleSubmit, isSubmitting}) => (
                <Form onSubmit={handleSubmit} className="form">
                    <div className="form-row">
                        <label htmlFor="reasons">Reason for abortion</label>
                        <Field as='textarea'
                               className={`form-control`}
                               type="text"
                               id="reasons"
                               name="reasons"
                               value={values.reasons}
                               onChange={handleChange}
                               placeholder="Free text field..."/>
                    </div>
                    <div className="form-footer">
                        <div className="form-row mt-40 mb-10">
                            <button className="btn btn--danger" type="submit" disabled={isSubmitting}>
                                Yes, {modalFormat} offer
                            </button>
                        </div>
                        <div className="form-row mb-0">
                            <button type="button" className="btn btn--default btn--block"
                                    onClick={closeModal}>No
                            </button>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
}

export default CancelOrAbortForm;
