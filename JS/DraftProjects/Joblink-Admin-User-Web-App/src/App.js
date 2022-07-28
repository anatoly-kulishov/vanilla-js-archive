import React, {useEffect, StrictMode} from "react";
import {Provider, connect} from "react-redux";
import {BrowserRouter as Router} from "react-router-dom";
import PropTypes from 'prop-types';
import store from "./store"
import AppNavigation from "./navigation/AppNavigation/AppNavigation";
import LoginNavigation from "./navigation/LoginNavigation";
import {clientPing, initializeApp} from "./store/actions/appActions";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Spinner from "./components/Spinner";

const App = props => {
    const {isAuth, initialized, initializeApp, clientPing} = props;

    useEffect(() => {
        initializeApp(isAuth);
    }, [initializeApp, isAuth])

    useEffect(() => {
        if (initialized && isAuth) {
            const clientPingInterval = setInterval(clientPing, 3000);
            return () => clearInterval(clientPingInterval)
        }
    }, [initialized, clientPing, isAuth])

    return (
        <div className="app">
            {!initialized && <Spinner/>}
            {initialized && (
                <>
                    <Header/>
                    {isAuth ? <AppNavigation/> : <LoginNavigation/>}
                    {!isAuth && <Footer/>}
                </>
            )}
        </div>
    );
}

App.propTypes = {
    isAuth: PropTypes.bool,
    initialized: PropTypes.bool,
    initializeApp: PropTypes.func,
    fetchOrders: PropTypes.func
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized,
    isAuth: state.login.isAuth
})

const AppContainer = connect(mapStateToProps, {initializeApp, clientPing})(App);

const JoblinkJSApp = () => {
    return (
        <StrictMode>
            <Provider store={store}>
                <Router>
                    <AppContainer/>
                </Router>
            </Provider>
        </StrictMode>
    )
}

export default JoblinkJSApp;


