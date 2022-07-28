import {Platform} from "react-native";
import {THEME} from "../theme";

export const navigationScreenOptions = {
    headerBackTitle: 'Back',
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? THEME.MAIN_COLOR : '#fff'
    },
    headerTintColor: Platform.OS === 'android' ? '#fff' : THEME.MAIN_COLOR
}