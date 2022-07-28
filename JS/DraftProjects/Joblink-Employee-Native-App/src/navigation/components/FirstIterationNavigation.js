import * as React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import {navigationScreenOptions} from "../navigationOptions";
import PersonalInfo from "../../screens/PersonalInfo";
import Agreement from "../../screens/Agreement";
import Skills from "../../screens/Skills";

const Stack = createStackNavigator();

export const FirstIterationNavigation = () => {
    return (
        <Stack.Navigator initialRouteName="Profile" screenOptions={navigationScreenOptions}>
            <Stack.Screen
                name="Profile"
                component={PersonalInfo}/>
            <Stack.Screen
                name="Agreement"
                component={Agreement}/>
            <Stack.Screen
                name="Skills"
                component={Skills}/>
        </Stack.Navigator>
    )
}
