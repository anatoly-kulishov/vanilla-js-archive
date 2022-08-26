import React from 'react';
import ErrorBoundary from "../../components/ErrorBoundary";
import LoginForm from "./LoginForm/LoginForm";

const Login = props => {
    const {title, alert, signIn} = props;

    return (
        <ErrorBoundary>
            <div className="row">
                <div className="col-12">
                    <div className="app-login__head">
                        <h1 className="title">{title}</h1>
                    </div>
                </div>
                <div className="col-12">
                    <div className="app-login__body">
                        <LoginForm onSubmit={signIn} alert={alert}/>
                    </div>
                </div>
            </div>
        </ErrorBoundary>
    )
}


export default Login;
