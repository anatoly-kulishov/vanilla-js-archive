import React from 'react';
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {THEME} from "../../theme";
import {NotificationNavigation} from "./NotificationNavigation";
import {CalendarNavigation} from "./CalendarNavigation";
import {ProfileNavigation} from "./ProfileNavigation";
import {AppTabBarIcon} from "../../components/ui/AppTabBarIcon";

const BottomTab = Platform.OS === 'android' ? createMaterialBottomTabNavigator() : createBottomTabNavigator();

export const MainTabNavigation = () => {
    return (
        <BottomTab.Navigator
            shifting={true}
            initialRouteName="CalendarNavigation"
            barStyle={{
                backgroundColor: "rgba(250, 250, 250, 0.9)",
            }}
            tabBarOptions={{
                activeTintColor: Platform.OS === 'android' ? '#fff' : THEME.MAIN_COLOR,
                labelStyle: {margin: 5},
            }}>
            <BottomTab.Screen
                name="CalendarNavigation"
                component={CalendarNavigation}
                options={{
                    tabBarLabel: 'Kalenteri',
                    tabBarIcon: ({color}) => <AppTabBarIcon name="ios-calendar-outline" color={color}/>,
                }}/>
            <BottomTab.Screen
                name="NotificationNavigation"
                component={NotificationNavigation}
                options={{
                    tabBarLabel: 'Ilmoituksia',
                    tabBarIcon: ({color}) => <AppTabBarIcon name="ios-notifications" color={color}/>,
                }}/>
            <BottomTab.Screen
                name="ProfileNavigation"
                component={ProfileNavigation}
                options={{
                    tabBarLabel: 'Profiilini',
                    tabBarIcon: ({color}) => <AppTabBarIcon name="ios-person" color={color}/>,
                }}/>
        </BottomTab.Navigator>
    );
}
