import React, {useState} from 'react';
import {Formik, Form, Field} from 'formik';
import {NavLink} from "react-router-dom";
import Alert from "../../../components/Alert";
import viewShow from "./view_show.svg";
import viewHide from "./view_hide.svg";
import validators from "../../../utils/validators/validators";
import {fieldErrorClass} from "../../../constants";

const LoginForm = props => {
    const {onSubmit, alert} = props;
    const [showPassword, setShowPassword] = useState(false);
    const iconType = showPassword ? viewShow : viewHide;
    const handleClick = () => setShowPassword(!showPassword);

    return (
        <Formik
            initialValues={{email: '', password: ''}}
            onSubmit={(values, {setSubmitting, resetForm}) => {
                onSubmit(values, setSubmitting, resetForm)
            }}>
            {({values, handleChange, touched, errors, isSubmitting, handleSubmit}) => (
                <Form onSubmit={handleSubmit} className="form editing-company-form">
                    <div className="form-row">
                        <label htmlFor="loginEmail">Email</label>
                        <Field className={`form-control ${errors.email && touched.email && fieldErrorClass}`}
                               type="email"
                               name="email"
                               value={values.email}
                               onChange={handleChange}
                               validate={validators.required}
                               placeholder="Enter Your Email"/>
                    </div>
                    <div className="form-row">
                        <label htmlFor="loginPassword">Password</label>
                        <span className="relative">
                                <Field
                                    className={`form-control w-100 ${errors.password && touched.password && fieldErrorClass}`}
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    placeholder="Enter Password"
                                    validate={validators.required}
                                    autoComplete="on"/>
                                    <span className="password-show"
                                          style={{backgroundImage: `url('${iconType}')`}}
                                          onClick={handleClick}>
                                    </span>
                                </span>
                    </div>
                    {alert && (
                        <div className="form-row">
                            <Alert type={alert.color} text="Incorrect Email or Password"/>
                        </div>
                    )}
                    <div className="form-row mb-3">
                        <button type="submit"
                                disabled={isSubmitting}
                                className="btn btn--block btn--green">Sign in
                        </button>
                    </div>
                    <div className="form-row mb-0">
                        <NavLink to="/reset-password">
                            <span className="btn btn--block btn--light-green">Forgot password?</span>
                        </NavLink>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default LoginForm;