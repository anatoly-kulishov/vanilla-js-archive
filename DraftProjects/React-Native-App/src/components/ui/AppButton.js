import React from 'react';
import {StyleSheet, View, TouchableOpacity, TouchableNativeFeedback, Platform} from 'react-native';
import SvgUri from "expo-svg-uri";
import {THEME} from "../../theme";
import {AppTextBold} from "./AppTextBold";

export const AppButton = props => {
    const {children, onPress, bgColor, borderColor = THEME.BORDER_MAIN_COLOR, color = "#fff", style, icon = false} = props;
    const Wrapper = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

    const Icon = (
        <View style={{alignItems: 'center'}}>
            <SvgUri source={require("../../images/good.svg")}/>
        </View>
    )

    return (
        <Wrapper onPress={onPress} activeOpacity={0.7}>
            <View style={{...styles.button, backgroundColor: bgColor, borderColor: borderColor, ...style}}>
                <AppTextBold style={{...styles.text, color: color}}>{children}</AppTextBold>
                {icon ? Icon : null}
            </View>
        </Wrapper>
    )
}

const styles = StyleSheet.create({
    button: {
        padding: 14,
        borderWidth: 1,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
});
