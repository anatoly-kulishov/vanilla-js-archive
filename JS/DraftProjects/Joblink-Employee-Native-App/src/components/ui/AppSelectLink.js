import React from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform,
} from 'react-native';
import SvgUri from "expo-svg-uri";
import {THEME} from "../../theme";
import {AppText} from "./AppText";

export const AppSelectLink = props => {
    const {
        label,
        data = [],
        selectedValue,
        setSelectedValue,
        marginBottom = 24,
        color = THEME.INPUT_MAIN_COLOR,
        redirect,
        inCorrect = true
    } = props;
    const Wrapper = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
    const correctBorderColor = inCorrect ? THEME.BORDER_MAIN_COLOR : THEME.DANGER_COLOR;
    const correctTextColor = inCorrect ? THEME.TEXT_MAIN_COLOR : THEME.DANGER_COLOR;

    return (
        <View>
            <View style={{marginBottom}}>
                <AppText style={{...styles.label, color: correctTextColor}}>{label}</AppText>
                <Wrapper onPress={redirect && redirect} activeOpacity={0.7}>
                    <View style={{...styles.picker, backgroundColor: color, borderColor: correctBorderColor}}>
                        <AppText>Select</AppText>
                        <View style={styles.arrow}>
                            <SvgUri source={require("../../images/arrow-right.svg")}/>
                        </View>
                    </View>
                </Wrapper>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    label: {
        fontSize: 15,
        marginLeft: 4,
        marginBottom: 5
    },
    picker: {
        paddingVertical: 12,
        paddingHorizontal: 12,
        marginTop: 5,
        borderWidth: 1,
        borderRadius: 4,
        backgroundColor: '#fafafa',
        borderColor: THEME.BORDER_MAIN_COLOR
    },
    arrow: {
        position: 'absolute',
        top: "80%",
        right: 20
    }
});
