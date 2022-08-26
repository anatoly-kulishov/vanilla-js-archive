import React from 'react';
import {Route, Switch, Redirect} from "react-router-dom";
import LoginScreen from "../../screens/LoginScreen";
import EmptyScreen from "../../screens/EmptyScreen";
import PasswordReset from "../../screens/PasswordResetScreen";
import ErrorBoundary from "../../components/ErrorBoundary";
import ResetDoneScreen from "../../screens/PasswordResetScreen/ResetDoneScreen";

const routes = [
    {
        path: "/",
        exact: true,
        component: <LoginScreen title="Sign in"/>
    },
    {
        path: "/reset-password",
        component: <PasswordReset title="Password Reset"/>
    },
    {
        path: "/terms-conditions",
        component: <EmptyScreen title="Terms & Conditions"/>
    },
    {
        path: "/privacy-policy",
        component: <EmptyScreen title="Privacy Policy"/>
    },
    {
        path: "/reset-done",
        component: <ResetDoneScreen/>
    },
];

const LoginNavigation = () => {
    return (
        <ErrorBoundary>
            <div className="app-login">
                <div className="app-login__wrapper">
                    <div className="container">
                        <Switch>
                            {routes.map((route, index) => (
                                <Route
                                    key={index}
                                    path={route.path}
                                    exact={route.exact}
                                    children={route.component}
                                />
                            ))}
                            <Route path="*">
                                <Redirect to="/"/>
                            </Route>
                        </Switch>
                    </div>
                </div>
            </div>
        </ErrorBoundary>
    )
}

export default LoginNavigation



