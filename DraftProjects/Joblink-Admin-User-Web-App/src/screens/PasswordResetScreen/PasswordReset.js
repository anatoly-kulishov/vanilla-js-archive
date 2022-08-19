import React, {useState} from 'react';
import {Redirect} from "react-router-dom";
import ErrorBoundary from "../../components/ErrorBoundary";

const PasswordReset = props => {
    const {title, resetPassword} = props;
    const [redirect, setRedirect] = useState(false);

    const onResetPassword = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const resetForm = {email: form['email'].value}
        resetPassword(resetForm.email);
        setRedirect(!redirect);
    }

    if (redirect) {
        return <Redirect to="/reset-done"/>;
    }

    return (
        <ErrorBoundary>
            <div className="app-login__head app-login__head--login-reset">
                <h2 className="title">{title}</h2>
            </div>
            <div className="col-12">
                <div className="app-login__body app-login__body--login-reset">
                    <p>Enter email you registered with and we will send you link to reset password</p>
                </div>
                <form onSubmit={onResetPassword}>
                    <div className="form-row">
                        <label htmlFor="loginEmail">Email</label>
                        <input type="email" className="form-control"
                               name="email" placeholder="Enter Your Email"
                               required/>
                    </div>
                    <div className="form-row">
                        <button type="submit" className="btn btn--green">Reset password</button>
                    </div>
                </form>
            </div>
        </ErrorBoundary>
    )
}

export default PasswordReset;
