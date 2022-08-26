import React from 'react';
import {View, StyleSheet, Platform, TouchableNativeFeedback, TouchableOpacity} from 'react-native';
import PropTypes from "prop-types";
import {THEME} from "../../theme";
import {AppText} from "../ui/AppText";
import {BaseCalendarIconStyles} from "../../styles";

const FullyAvailable = props => {
    const {date, state, onPressCallback} = props;
    const Wrapper = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

    return (
        <Wrapper activeOpacity={0.7} onPress={() => onPressCallback(date)}>
            <View style={{...styles.container, ...styles.border}}>
                <AppText style={{...BaseCalendarIconStyles.title}}>
                    {date.day ? date.day : date}
                </AppText>
            </View>
        </Wrapper>
    )
}

FullyAvailable.propTypes = {
    date: PropTypes.any,
    state: PropTypes.any,
    onPressCallback: PropTypes.func
}

const styles = StyleSheet.create({
    ...BaseCalendarIconStyles,
    border: {
        borderWidth: 1,
        borderRadius: 4,
        borderColor: THEME.GREEN_COLOR,
        backgroundColor: THEME.SECONDARY_COLOR
    }
});

export default React.memo(FullyAvailable);
