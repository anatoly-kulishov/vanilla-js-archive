import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import {MainTabNavigation} from "./components/MainTabNavigation";
import Offers from "../screens/Offers";
import Offer from "../screens/Offers/Offer";
import Chat from "../screens/AllNotifications/Messages/Chat";
import TimeEdit from "../screens/TimeEdit";

const Stack = createStackNavigator();

export const GeneralNavigation = () => {
    return (
        <Stack.Navigator initialRouteName="Tabs">
            <Stack.Screen name="Tabs"
                          component={MainTabNavigation}
                          options={{headerShown: false}}/>
            <Stack.Screen
                name="Offers"
                component={Offers}/>
            <Stack.Screen
                name="JobOffer"
                component={Offer}
                options={{
                    title: "Job offer"
                }}/>
            <Stack.Screen
                name="Chat"
                component={Chat}
                options={{
                    title: "Joblink Support",
                }}/>
            <Stack.Screen
                name="TimeEditScreen"
                component={TimeEdit}
                options={{
                    title: "Edit Time"
                }}/>
        </Stack.Navigator>
    );
}
