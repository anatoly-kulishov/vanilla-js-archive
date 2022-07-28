import React from 'react';
import {View, StyleSheet, Platform, TouchableNativeFeedback, TouchableOpacity} from 'react-native';
import PropTypes from "prop-types";
import SvgUri from "expo-svg-uri";
import {THEME} from "../../theme";
import {AppText} from "../ui/AppText";
import {BaseCalendarIconStyles} from "../../styles";

const NotAvailableOtherReason = props => {
    const {date, state, onPressCallback} = props;
    const Wrapper = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
    const NotAvailableOtherReasonIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none"><path d="M6 12A6 6 0 1 0 6 0a6 6 0 1 0 0 12z" fill="#fb7185"/><g fill="#fff"><circle cx="3" cy="6" r="1"/><circle cx="6" cy="6" r="1"/><circle cx="9" cy="6" r="1"/></g></svg>'

    return (
        <Wrapper activeOpacity={0.7}>
            <View style={{...styles.container, ...styles.border}}>
                <AppText style={{...styles.title}}>
                    {date.day ? date.day : date}
                </AppText>
                <View style={styles.icon}>
                    <SvgUri svgXmlData={NotAvailableOtherReasonIcon}/>
                </View>
            </View>
        </Wrapper>
    )
}

NotAvailableOtherReason.propTypes = {
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

export default React.memo(NotAvailableOtherReason);
