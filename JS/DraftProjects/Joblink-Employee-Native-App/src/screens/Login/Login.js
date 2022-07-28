import React from 'react';
import {View, StyleSheet} from 'react-native';
import PropTypes from "prop-types";
import SvgUri from "expo-svg-uri";
import LoginForm from "./LoginForm";

const Login = (props) => {
    const {navigation, signIn} = props;

    return (
        <View style={styles.container}>
            <View style={{alignItems: 'center'}}>
                <SvgUri style={styles.logo} source={require("../../images/logo.svg")}/>
            </View>
            <LoginForm onSubmit={signIn} navigation={navigation}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 60,
        paddingHorizontal: 20,
        height: "100%",
        backgroundColor: '#fff'
    },
    logo: {
        width: 113,
        height: 24,
    }
})

Login.propTypes = {
    navigation: PropTypes.object,
    signIn: PropTypes.func
}

export default Login;
