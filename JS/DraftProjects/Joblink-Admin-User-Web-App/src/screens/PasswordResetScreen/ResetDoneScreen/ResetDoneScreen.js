import React, {useState, useEffect} from 'react';
import {Redirect} from "react-router-dom";
import {useSelector} from "react-redux";
import ErrorBoundary from "../../../components/ErrorBoundary";
import {__resetEmail_} from "../../../constants";
import mailIcon from '../../../assets/images/mail-download.svg';

const ResetDoneScreen = () => {
    const [redirect, setRedirect] = useState(false);
    const email_for_reset = useSelector(state => state.login.email_for_reset);
    const successAlert = (<strong className="subtitle">{email_for_reset}</strong>);
    const warningAlert = (<div className="alert alert-warning">Something went wrong. try again</div>);

    useEffect(() => {
        setRedirect(!email_for_reset);
    }, [email_for_reset])

    const onHandlerDone = () => {
        sessionStorage.removeItem(__resetEmail_);
        setRedirect(!redirect)
    }

    if (redirect) {
        return <Redirect to="/"/>;
    }

    return (
        <ErrorBoundary>
            <div className="app-login__head app-login__head--reset-done">
                <img className="main-icon" src={mailIcon} alt="We’ve sent you email to"/>
                <p>We’ve sent you email to</p>
                {email_for_reset ? successAlert : warningAlert}
            </div>
            <div className="app-login__body app-login__body--reset-done">
                <div className="custom-alert custom-alert-info">
                    <strong className="custom-alert-head">Please, check your email
                        and follow the instructions</strong>
                    <p className="custom-alert-body">Note, if you didn’t receive the email,
                        check “Spam” or “Junk” folders</p>
                </div>
            </div>
            <div className="app-login__footer">
                <button className="btn btn--block btn--light-green"
                        onClick={onHandlerDone}>Done
                </button>
            </div>
        </ErrorBoundary>
    )
}

export default ResetDoneScreen;
