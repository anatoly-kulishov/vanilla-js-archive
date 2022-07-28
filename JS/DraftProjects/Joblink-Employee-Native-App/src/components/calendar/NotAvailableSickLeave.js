import React from 'react';
import {View, StyleSheet, Platform, TouchableNativeFeedback, TouchableOpacity} from 'react-native';
import PropTypes from "prop-types";
import SvgUri from "expo-svg-uri";
import {THEME} from "../../theme";
import {AppText} from "../ui/AppText";
import {BaseCalendarIconStyles} from "../../styles";

const NotAvailableSickLeave = props => {
    const {date, state, onPressCallback} = props;
    const Wrapper = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
    const NotAvailableSickLeaveIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" stroke-linejoin="round"><path d="M7 13A6 6 0 1 0 7 1a6 6 0 1 0 0 12z" fill="#fb7185" stroke="#fb7185" stroke-width="2"/><path d="M7.75 4h-1.5v2.25H4v1.5h2.25V10h1.5V7.75H10v-1.5H7.75V4z" fill="#fff" stroke="#fff"/></svg>'

    return (
        <Wrapper activeOpacity={0.7}>
            <View style={{...styles.container, ...styles.border}}>
                <AppText style={{...styles.title}}>
                    {date.day ? date.day : date}
                </AppText>
                <View style={styles.icon}>
                    <SvgUri svgXmlData={NotAvailableSickLeaveIcon}/>
                </View>
            </View>
        </Wrapper>
    )
}

NotAvailableSickLeave.propTypes = {
    date: PropTypes.any,
    state: PropTypes.any,
    onPressCallback: PropTypes.func
}

const styles = StyleSheet.create({
    ...BaseCalendarIconStyles,
    border: {
        borderWidth: 2,
        borderStyle: 'dotted',
        borderRadius: 4,
        backgroundColor: THEME.PINK_COLOR,
        borderColor: THEME.PINK_COLOR_2
    }
});

export default React.memo(NotAvailableSickLeave);
