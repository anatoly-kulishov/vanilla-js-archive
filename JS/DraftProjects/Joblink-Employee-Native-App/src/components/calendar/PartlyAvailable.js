import React from 'react';
import {View, StyleSheet, Platform, TouchableNativeFeedback, TouchableOpacity} from 'react-native';
import PropTypes from "prop-types";
import SvgUri from "expo-svg-uri";
import {THEME} from "../../theme";
import {AppText} from "../ui/AppText";
import {BaseCalendarIconStyles} from "../../styles";

const PartlyAvailable = props => {
    const {date, state, onPressCallback} = props;
    const Wrapper = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
    const PartlyAvailableIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none"><path d="M12 0L0 12V0h12z" fill="#4ade80"/></svg>';

    return (
        <Wrapper activeOpacity={0.7}>
            <View style={{...styles.container, ...styles.border}}>
                <AppText style={{...BaseCalendarIconStyles.title}}>
                    {date.day ? date.day : date}
                </AppText>
                <View style={{...styles.icon, top: 0, left: 0}}>
                    <SvgUri svgXmlData={PartlyAvailableIcon}/>
                </View>
            </View>
        </Wrapper>
    )
}

PartlyAvailable.propTypes = {
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
        backgroundColor: THEME.PINK_COLOR
    }
});

export default React.memo(PartlyAvailable);
