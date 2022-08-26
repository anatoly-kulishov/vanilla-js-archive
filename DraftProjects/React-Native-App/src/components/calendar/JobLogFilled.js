import React from 'react';
import {View, StyleSheet, Platform, TouchableNativeFeedback, TouchableOpacity} from 'react-native';
import PropTypes from "prop-types";
import SvgUri from "expo-svg-uri";
import {THEME} from "../../theme";
import {AppText} from "../ui/AppText";
import {BaseCalendarIconStyles} from "../../styles";

const JobLogFilled = props => {
    const {date, state, onPressCallback} = props;
    const Wrapper = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
    const JobLogFilledIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none"><path d="M6.898 1.936a1 1 0 0 0-1.794.005l-.966 1.972-2.209.32a1 1 0 0 0-.556 1.705l.35-.358-.35.358 1.603 1.567-.378 2.149a1 1 0 0 0 1.455 1.056l-.235-.441.235.441L6 9.671l1.948 1.038a1 1 0 0 0 1.455-1.054l-.375-2.151 1.601-1.568a1 1 0 0 0-.555-1.704l-2.194-.32-.981-1.976z" fill="#fbbf24" stroke="#fff" stroke-linejoin="round"/></svg>'

    return (
        <Wrapper activeOpacity={0.7}>
            <View style={{...styles.container, ...styles.border}}>
                <AppText style={{...BaseCalendarIconStyles.title}}>
                    {date.day ? date.day : date}
                </AppText>
                <View style={styles.icon}>
                    <SvgUri svgXmlData={JobLogFilledIcon}/>
                </View>
            </View>
        </Wrapper>
    )
}

JobLogFilled.propTypes = {
    date: PropTypes.any,
    state: PropTypes.any,
    onPressCallback: PropTypes.func
}

const styles = StyleSheet.create({
    ...BaseCalendarIconStyles,
    border: {
        borderWidth: 2,
        borderRadius: 50,
        borderColor: THEME.YELLOW_COLOR
    },
});

export default React.memo(JobLogFilled);
