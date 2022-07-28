import React from 'react';
import {StyleSheet, View, CheckBox, Switch, Platform} from 'react-native';
import {THEME} from "../../theme";
import {AppText} from "./AppText";

export const AppCheckBox = props => {
    const {
        label,
        value,
        handleChange,
        marginBottom = 24,
        containerStyle,
        onPressCallback,
        color = THEME.INPUT_MAIN_COLOR,
        inCorrect = true
    } = props;
    const correctTextColor = inCorrect ? THEME.TEXT_MAIN_COLOR : THEME.DANGER_COLOR;

    return (
        <View style={{...styles.container, marginBottom}}>
            <View style={{...styles.checkboxContainer, ...containerStyle}}>
                {Platform.OS === 'android' ? (
                    <CheckBox
                        type={'checkbox'}
                        value={value}
                        onValueChange={handleChange}
                        style={{...styles.checkbox, backgroundColor: color}}/>
                ) : (
                    <Switch
                        value={value}
                        onValueChange={handleChange}
                        trackColor={{false: "#2196F3", true: "#2196F3"}}
                        thumbColor={value ? "#fff" : "#f4f3f4"}
                        ios_backgroundColor={THEME.GREY_COLOR}/>
                )}
                <AppText onPressCallback={onPressCallback}
                         style={{...styles.label, color: correctTextColor}}>{label}</AppText>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    checkboxContainer: {
        flexDirection: "row",
        marginVertical: 20,
    },
    checkbox: {
        alignSelf: "center",
    },
    label: {
        margin: 8,
    },
});
