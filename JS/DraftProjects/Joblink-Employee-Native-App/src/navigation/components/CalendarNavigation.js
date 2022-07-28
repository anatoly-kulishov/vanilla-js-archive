import React from 'react';
import {Platform} from "react-native";
import {useDispatch} from "react-redux";
import {createStackNavigator} from "@react-navigation/stack";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {navigationScreenOptions} from "../navigationOptions";
import TimeEdit from "../../screens/TimeEdit";
import {AppHeaderIcon} from "../../components/ui/AppHeaderIcon";
import MainCalendar from "../../screens/MainCalendar";
import DatesRange from "../../screens/MainCalendar/DatesRange";
import Confirmation from "../../screens/MainCalendar/Confirmation";
import Designations from "../../screens/MainCalendar/Designations";
import EditingAvailability from "../../screens/MainCalendar/EditingAvailability";
import DateSelection from "../../screens/MainCalendar/DateSelection";
import {clearAllSelectedDate} from "../../store/actions/calendarActions";

const Stack = createStackNavigator();

export const CalendarNavigation = ({navigation}) => {
    const dispatch = useDispatch();
    return (
        <Stack.Navigator initialRouteName="Calendar" screenOptions={navigationScreenOptions}>
            <Stack.Screen
                name="Calendar"
                component={MainCalendar}
                options={
                    {
                        title: 'Calendar',
                        headerRight: () => (
                            <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                                <Item
                                    title='Calendar designations'
                                    iconName='ios-information-circle-outline'
                                    color={Platform.OS === 'ios' ? '#A1A1AA' : '#fff'}
                                    onPress={() => navigation.navigate("Designations")}
                                />
                            </HeaderButtons>
                        ),
                    }
                }/>
            <Stack.Screen
                name="Designations"
                component={Designations}
                options={{
                    title: 'Calendar designations',
                }}/>
            <Stack.Screen
                name="CalendarDateSelection"
                component={DateSelection}
                options={{
                    title: 'Editing',
                    headerRight: () => (
                        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                            <Item
                                title='Clear All'
                                onPress={() => dispatch(clearAllSelectedDate())}
                            />
                        </HeaderButtons>
                    ),
                }}/>
            <Stack.Screen
                name="CalendarDatesRange"
                component={DatesRange}
                options={{
                    title: 'Editing',
                    headerRight: () => (
                        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                            <Item
                                title='Clear All'
                                onPress={() => dispatch(clearAllSelectedDate())}
                            />
                        </HeaderButtons>
                    ),
                }}/>
            <Stack.Screen
                name="CalendarConfirmation"
                component={Confirmation}
                options={{
                    title: 'Confirmation',
                }}/>
            <Stack.Screen
                name="CalendarEditingAvailability"
                component={EditingAvailability}
                options={{
                    title: 'Valitse päivät',
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
