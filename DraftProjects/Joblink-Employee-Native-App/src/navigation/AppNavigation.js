import React, {memo, useCallback, useEffect, useState} from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import {GeneralNavigation} from "./GeneralNavigation";
import {FirstIterationNavigation} from "./components/FirstIterationNavigation";
import {OnBoardingNavigation} from "./components/OnBoardingNavigation";
import {getEmployeeData} from "../store/actions/employeesActions";
import {useDispatch, useSelector} from "react-redux";
import {getMyProfile} from "../store/selectors/auth-selectors";

const Stack = createStackNavigator();

const AppNavigation = () => {
    // Other hooks
    const dispatch = useDispatch();

    // Selectors
    const myProfile = useSelector(getMyProfile);

    // States
    const [firstIteration] = useState(false);

    // Actions
    const checkNotificationsInterval = useCallback(() => setInterval(() => dispatch(getEmployeeData(myProfile?.id, myProfile?.CostCenterId)), 3500), [dispatch, myProfile]);

    useEffect(() => {
        if (myProfile) checkNotificationsInterval();
        return () => myProfile && clearInterval(checkNotificationsInterval);
    }, [])

    return (
        <Stack.Navigator initialRouteName={firstIteration ? 'FirstIterationNavigation' : 'GeneralNavigation'}>
            <Stack.Screen
                name="FirstIterationNavigation"
                component={FirstIterationNavigation}
                options={{headerShown: false}}/>
            <Stack.Screen
                name="OnBoardingNavigation"
                component={OnBoardingNavigation}
                options={{headerShown: false}}/>
            <Stack.Screen
                name="GeneralNavigation"
                component={GeneralNavigation}
                options={{headerShown: false}}/>
        </Stack.Navigator>
    )
}

export default memo(AppNavigation);
