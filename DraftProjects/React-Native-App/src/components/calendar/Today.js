import React from 'react';
import {View, StyleSheet, Platform, TouchableNativeFeedback, TouchableOpacity} from 'react-native';
import PropTypes from "prop-types";
import {THEME} from "../../theme";
import {AppTextBold} from "../ui/AppTextBold";
import {BaseCalendarIconStyles} from "../../styles";

const Today = props => {
    const {date, state, onPressCallback} = props;
    const Wrapper = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
    return (
        <Wrapper activeOpacity={0.7}>
            <View style={styles.container}>
                <AppTextBold>
                    {date.day ? date.day : date}
                </AppTextBold>
                <View style={styles.dot}/>
            </View>
        </Wrapper>
    )
}

Today.propTypes = {
    date: PropTypes.any,
    state: PropTypes.any,
    onPressCallback: PropTypes.func
}

const styles = StyleSheet.create({
    ...BaseCalendarIconStyles,
    dot: {
        width: 8,
        height: 8,
        borderRadius: 50,
        backgroundColor: THEME.INDIGO_COLOR
    }
});

export default React.memo(Today);