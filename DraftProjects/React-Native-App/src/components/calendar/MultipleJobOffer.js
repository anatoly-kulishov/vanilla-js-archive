import React from 'react';
import {View, StyleSheet, Platform, TouchableNativeFeedback, TouchableOpacity} from 'react-native';
import PropTypes from "prop-types";
import SvgUri from "expo-svg-uri";
import {THEME} from "../../theme";
import {AppText} from "../ui/AppText";
import {BaseCalendarIconStyles} from "../../styles";

const MultipleJobOffer = props => {
    const {date, state, onPressCallback} = props;
    const Wrapper = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
    const MultipleJobOfferIcon = '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.93411 2.93413L2.9341 2.93414C1.89438 3.97387 1.24997 5.4124 1.24997 7C1.24997 8.5876 1.89438 10.0261 2.9341 11.0659L3.46443 10.5355L2.93411 11.0659C3.97384 12.1056 5.41237 12.75 6.99997 12.75C8.58757 12.75 10.0261 12.1056 11.0658 11.0659C12.1055 10.0261 12.75 8.5876 12.75 7C12.75 5.4124 12.1055 3.97387 11.0658 2.93414L10.5355 3.46446L11.0658 2.93413C10.0261 1.89441 8.58757 1.25 6.99997 1.25C5.41237 1.25 3.97384 1.89441 2.93411 2.93413Z" fill="#14B8A6" stroke="#14B8A6" stroke-width="1.5" stroke-linejoin="round"/><path d="M4.69601 10.0002H9.3622V8.86879H6.61362V8.82404L7.56923 7.88761C8.91476 6.66033 9.27591 6.0467 9.27591 5.30202C9.27591 4.16744 8.34906 3.36523 6.94601 3.36523C5.57172 3.36523 4.62889 4.18661 4.63209 5.47141H5.94565C5.94246 4.84499 6.33876 4.46147 6.93642 4.46147C7.5117 4.46147 7.93997 4.81942 7.93997 5.39471C7.93997 5.91566 7.62037 6.27362 7.02591 6.8457L4.69601 9.00302V10.0002Z" fill="white"/></svg>\n';

    return (
        <Wrapper activeOpacity={0.7}>
            <View style={{...styles.container, ...styles.border}}>
                <AppText style={{...BaseCalendarIconStyles.title}}>
                    {date.day ? date.day : date}
                </AppText>
                <View style={styles.icon}>
                    <SvgUri svgXmlData={MultipleJobOfferIcon}/>
                </View>
            </View>
        </Wrapper>
    )
}

MultipleJobOffer.propTypes = {
    date: PropTypes.any,
    state: PropTypes.any,
    onPressCallback: PropTypes.func
}

const styles = StyleSheet.create({
    ...BaseCalendarIconStyles,
    border: {
        borderWidth: 2,
        borderRadius: 50,
        backgroundColor: THEME.GREY_COLOR_2,
        borderColor: THEME.INFO_COLOR
    },
});

export default React.memo(MultipleJobOffer);
