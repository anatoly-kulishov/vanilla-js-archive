import React from 'react';
import {View, StyleSheet, Platform, TouchableNativeFeedback, TouchableOpacity} from 'react-native';
import PropTypes from "prop-types";
import SvgUri from "expo-svg-uri";
import {THEME} from "../../theme";
import {AppText} from "../ui/AppText";
import {BaseCalendarIconStyles} from "../../styles";

const JobLogMissing = props => {
    const {date, state, onPressCallback} = props;
    const Wrapper = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
    const JobLogMissingIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none"  xmlns:v="https://vecta.io/nano"><path d="M2.934 2.934h0C1.894 3.974 1.25 5.412 1.25 7s.644 3.026 1.684 4.066l.53-.53-.53.53C3.974 12.106 5.412 12.75 7 12.75s3.026-.644 4.066-1.684S12.75 8.588 12.75 7s-.645-3.026-1.684-4.066l-.53.53.53-.53C10.026 1.894 8.588 1.25 7 1.25s-3.026.644-4.066 1.684z" fill="#fff" stroke="#fbbf24" stroke-width="1.5" stroke-linejoin="round"/><g fill="#fbbf24"><circle cx="7" cy="10" r="1"/><rect x="6" y="3" width="2" height="5" rx="1"/></g></svg>'

    return (
        <Wrapper activeOpacity={0.7}>
            <View style={{...styles.container, ...styles.border}}>
                <AppText style={{...styles.title}}>
                    {date.day ? date.day : date}
                </AppText>
                <View style={styles.icon}>
                    <SvgUri svgXmlData={JobLogMissingIcon}/>
                </View>
            </View>
        </Wrapper>
    )
}

JobLogMissing.propTypes = {
    date: PropTypes.any,
    state: PropTypes.any,
    onPressCallback: PropTypes.func
}

const styles = StyleSheet.create({
    ...BaseCalendarIconStyles,
    border: {
        borderWidth: 2,
        borderStyle: 'dotted',
        borderRadius: 50,
        borderColor: THEME.YELLOW_COLOR
    }
});

export default React.memo(JobLogMissing);
