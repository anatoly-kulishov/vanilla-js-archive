import React from 'react';
import {Platform} from "react-native";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {createStackNavigator} from "@react-navigation/stack";
import {navigationScreenOptions} from "../navigationOptions";
import {AppHeaderIcon} from "../../components/ui/AppHeaderIcon";
import AllNotifications from "../../screens/AllNotifications";
import Messages from "../../screens/AllNotifications/Messages";
import Archive from "../../screens/AllNotifications/Archive";

const Stack = createStackNavigator();

export const NotificationNavigation = props => {
    const {navigation} = props;
    return (
        <Stack.Navigator initialRouteName="AllNotifications" screenOptions={navigationScreenOptions}>
            <Stack.Screen
                name="AllNotifications"
                component={AllNotifications}
                options={
                    {
                        title: 'All Notifications',
                        headerRight: () => (
                            <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                                <Item
                                    title='Calendar designations'
                                    iconName='archive'
                                    color={Platform.OS === 'ios' ? '#16A34A' : '#fff'}
                                    onPress={() => navigation.navigate("Archive")}
                                />
                            </HeaderButtons>
                        ),
                    }
                }/>
            <Stack.Screen
                name="Archive"
                component={Archive}
                options={{
                    title: "Archive"
                }}/>
            <Stack.Screen
                name="Messages"
                component={Messages}/>
        </Stack.Navigator>
    )
}
