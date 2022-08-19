import React, {memo} from 'react';
import {View, StyleSheet, Platform, TouchableNativeFeedback, TouchableOpacity} from 'react-native';
import PropTypes from "prop-types";
import {AppText} from "../ui/AppText";
import {BaseCalendarIconStyles} from "../../styles";

const SelectedDay = props => {
    const {date, onPressCallback} = props;
    const Wrapper = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

    return (
        <Wrapper activeOpacity={0.7} onPress={onPressCallback}>
            <View style={{...styles.container, ...styles.selectedDayWrapper}}>
                <AppText style={{...BaseCalendarIconStyles.title, ...styles.selectedDayTitle}}>
                    {date.day ? date.day : date}
                </AppText>
            </View>
        </Wrapper>
    )
}

SelectedDay.propTypes = {
    date: PropTypes.any,
    state: PropTypes.any,
    onPressCallback: PropTypes.func
}

const styles = StyleSheet.create({
    ...BaseCalendarIconStyles,
    selectedDayWrapper: {
        backgroundColor: '#60A5FA',
        borderRadius: 4,
    },
    selectedDayTitle: {
        color: '#fff'
    }
});

export default memo(SelectedDay);
