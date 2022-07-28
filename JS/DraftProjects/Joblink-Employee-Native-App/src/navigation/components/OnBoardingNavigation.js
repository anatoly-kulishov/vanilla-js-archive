import * as React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import {navigationScreenOptions} from "../navigationOptions";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {AppHeaderIcon} from "../../components/ui/AppHeaderIcon";
import Screen_1 from "../../screens/OnBoardings/Screen_1";
import Screen_3 from "../../screens/OnBoardings/Screen_3";
import Screen_2 from "../../screens/OnBoardings/Screen_2";

const Stack = createStackNavigator();

export const OnBoardingNavigation = props => {
    const {navigation} = props;
    return (
        <Stack.Navigator initialRouteName="OnBoarding 1" screenOptions={navigationScreenOptions}>
            <Stack.Screen
                name="OnBoarding 1"
                component={Screen_1}
                options={{
                    title: '',
                    headerRight: () => (
                        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                            <Item
                                title='Skip'
                                iconName='ios-arrow-redo-outline'
                                onPress={() => navigation.navigate('GeneralNavigation')}
                            />
                        </HeaderButtons>
                    ),
                }}/>
            <Stack.Screen
                name="OnBoarding 2"
                component={Screen_2}
                options={{
                    title: ''
                }}/>
            <Stack.Screen
                name="OnBoarding 3"
                component={Screen_3}
                options={{
                    title: ''
                }}/>
        </Stack.Navigator>
    )
}
