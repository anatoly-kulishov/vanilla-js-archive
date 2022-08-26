import React from 'react';
import {View, StyleSheet, Platform, TouchableNativeFeedback, TouchableOpacity} from 'react-native';
import PropTypes from "prop-types";
import SvgUri from "expo-svg-uri";
import {THEME} from "../../theme";
import {AppText} from "../ui/AppText";
import {BaseCalendarIconStyles} from "../../styles";

const OfferIgnored = props => {
    const {date, state, onPressCallback} = props;
    const Wrapper = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
    const OfferIgnoredIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none"><path d="M2.934 2.934h0C1.894 3.974 1.25 5.412 1.25 7s.644 3.026 1.684 4.066l.53-.53-.53.53C3.974 12.106 5.412 12.75 7 12.75s3.026-.644 4.066-1.684S12.75 8.588 12.75 7s-.645-3.026-1.684-4.066l-.53.53.53-.53C10.026 1.894 8.588 1.25 7 1.25s-3.026.644-4.066 1.684z" fill="#ef4444" stroke="#ef4444" stroke-width="1.5" stroke-linejoin="round"/><path d="M6.956 8.933c-.194 0-.35-.059-.466-.178s-.175-.281-.175-.489v-.122c0-.259.049-.489.146-.689s.214-.367.35-.5c.136-.141.317-.3.544-.478.285-.222.495-.419.631-.589.142-.178.214-.393.214-.644 0-.333-.1-.593-.301-.778-.194-.193-.485-.289-.874-.289-.595 0-1.094.259-1.495.778-.136.178-.295.267-.476.267-.11 0-.207-.037-.291-.111-.175-.141-.262-.307-.262-.5a.66.66 0 0 1 .117-.367c.259-.407.592-.715 1-.922C6.031 3.107 6.5 3 7.024 3c.505 0 .945.096 1.32.289.375.185.66.448.854.789.201.333.301.722.301 1.167 0 .289-.055.548-.165.778-.104.222-.23.411-.379.567-.149.148-.343.319-.583.511-.259.207-.453.385-.583.533-.123.148-.184.319-.184.511v.122c0 .207-.061.37-.184.489s-.278.178-.466.178zM6.966 11c-.259 0-.463-.074-.612-.222-.149-.156-.223-.356-.223-.6 0-.252.074-.456.223-.611s.353-.233.612-.233.463.078.612.233.223.359.223.611c0 .244-.074.444-.223.6-.149.148-.353.222-.612.222z" fill="#fff"/></svg>'

    return (
        <Wrapper activeOpacity={0.7}>
            <View style={{...styles.container, ...styles.border}}>
                <AppText style={{...BaseCalendarIconStyles.title}}>
                    {date.day ? date.day : date}
                </AppText>
                <View style={styles.icon}>
                    <SvgUri svgXmlData={OfferIgnoredIcon}/>
                </View>
            </View>
        </Wrapper>
    )
}

OfferIgnored.propTypes = {
    date: PropTypes.any,
    state: PropTypes.any,
    onPressCallback: PropTypes.func
}

const styles = StyleSheet.create({
    ...BaseCalendarIconStyles,
    border: {
        borderWidth: 2,
        borderRadius: 50,
        borderColor: THEME.DANGER_COLOR
    },
});

export default React.memo(OfferIgnored);
