import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

const mapStateToPropsForRedirect = (state) => ({
    isAuth: state.auth.isAuth
});

export function withAuthRedirect(WrappedComponent) {

    const RedirectComponent = props => {
        let {isAuth, ...restProps} = props

        if (!isAuth) return <Redirect to='/'/>

        return <WrappedComponent {...restProps}/>
    }

    return connect(
        mapStateToPropsForRedirect, {})
    (RedirectComponent);
}
