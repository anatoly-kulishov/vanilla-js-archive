import React, {useCallback, useEffect} from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import {LoginNavigation} from "./LoginNavigation";
import AppNavigation from "./AppNavigation";
import {clientPing, initializeApp} from "../store/actions/appActions";
import {AppLoader} from "../components/ui/AppLoader";
import {getIsAuth} from "../store/selectors/auth-selectors";
import {getInitializedStatus} from "../store/selectors/app-selectors";

export const MainNavigation = () => {
    // Other Hooks
    const dispatch = useDispatch();

    // Selectors
    const isAuth = useSelector(getIsAuth);
    const initialized = useSelector(getInitializedStatus);
    const dispatchClientPingAction = () => dispatch(clientPing());
    const clientPingInterval = useCallback(() => setInterval(dispatchClientPingAction, 3500), [dispatchClientPingAction]);

    // Side Effects
    useEffect(() => {
        dispatch(initializeApp(isAuth))
    }, [dispatch, isAuth])

    useEffect(() => {
        if (initialized && isAuth) {
            clientPingInterval()
            return () => clearInterval(clientPingInterval)
        }
    }, [dispatch, initialized, isAuth])

    if (!initialized) {
        return <AppLoader/>
    }

    return (
        <NavigationContainer>
            {isAuth ? <AppNavigation/> : <LoginNavigation/>}
        </NavigationContainer>
    )
}
