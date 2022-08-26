import * as React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import {navigationScreenOptions} from "../navigationOptions";
import SkillsAndAttachments from "../../screens/SkillsAndAttachments";
import PersonalInfoEdit from "../../screens/PersonalInfoEdit";
import Skills from "../../screens/Skills";
import PastLeaves from "../../screens/PastLeaves";
import Profile from "../../screens/Profile";
import Offers from "../../screens/Offers";
import JobLog from "../../screens/JobLog";
import MyStatistics from "../../screens/MyStatistics";
import Certificates from "../../screens/Certificates";
import TimeEdit from "../../screens/TimeEdit";

const Stack = createStackNavigator();

export const ProfileNavigation = () => {
    return (
        <Stack.Navigator initialRouteName="My Profile" screenOptions={navigationScreenOptions}>
            <Stack.Screen
                name="My Profile"
                component={Profile}/>
            <Stack.Screen
                name="EditProfileInfo"
                component={PersonalInfoEdit}
                options={{
                    title: "Account info"
                }}/>
            <Stack.Screen
                name="SkillsAndAttachments"
                component={SkillsAndAttachments}
                options={{
                    title: "Skills and Attachments"
                }}/>
            <Stack.Screen
                name="MyStatistics"
                component={MyStatistics}
                options={{
                    title: "Last three months"
                }}/>
            <Stack.Screen
                name="PastLeaves"
                component={PastLeaves}
                options={{
                    title: "Past leaves"
                }}/>
            <Stack.Screen
                name="Skills"
                component={Skills}/>
            <Stack.Screen
                name="Certificates"
                component={Certificates}/>
            <Stack.Screen
                name="Offers"
                component={Offers}/>
            <Stack.Screen
                name="Job log"
                component={JobLog}
                options={{
                    title: "Job log"
                }}/>
            <Stack.Screen
                name="TimeEditScreen"
                component={TimeEdit}
                options={{
                    title: "Edit Time"
                }}/>
        </Stack.Navigator>
    )
}
