import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from "../screens/Login";

import PasswordReset from "../screens/PasswordReset";
import ResetSuccessfully from "../screens/PasswordReset/ResetSuccessfully";

const Stack = createStackNavigator();

export const LoginNavigation = () => {
    return (
        <Stack.Navigator initialRouteName="Sign In">
            <Stack.Screen name="Sign In"
                          component={Login}
                          options={{headerShown: false}}/>
            <Stack.Screen name="Password Reset"
                          component={PasswordReset}
                          options={{title: "Salasanan nollaus"}}/>
            <Stack.Screen name="Reseted Successfully"
                          component={ResetSuccessfully}
                          options={{headerShown: false}}/>
        </Stack.Navigator>
    )
}
