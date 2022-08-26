import React, {memo} from 'react';
import {View, StyleSheet, Platform, TouchableNativeFeedback, TouchableOpacity} from 'react-native';
import PropTypes from "prop-types";
import SvgUri from "expo-svg-uri";
import {THEME} from "../../theme";
import {AppText} from "../ui/AppText";
import {BaseCalendarIconStyles} from "../../styles";
import {useNavigation} from "@react-navigation/native";

const NewJobOffer = props => {
    const {date} = props;
    const Wrapper = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
    const NewJobOfferIcon = '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M2.93411 2.93413L2.9341 2.93414C1.89438 3.97387 1.24997 5.4124 1.24997 7C1.24997 8.5876 1.89438 10.0261 2.9341 11.0659L3.46443 10.5355L2.93411 11.0659C3.97384 12.1056 5.41237 12.75 6.99997 12.75C8.58757 12.75 10.0261 12.1056 11.0658 11.0659C12.1055 10.0261 12.75 8.5876 12.75 7C12.75 5.4124 12.1055 3.97387 11.0658 2.93414L10.5355 3.46446L11.0658 2.93413C10.0261 1.89441 8.58757 1.25 6.99997 1.25C5.41237 1.25 3.97384 1.89441 2.93411 2.93413Z" fill="#14B8A6" stroke="#14B8A6" stroke-width="1.5" stroke-linejoin="round"/> <path d="M7.79659 4.18164H6.64034L5.2 5.09357V6.18448L6.53239 5.34925H6.56648V9.99982H7.79659V4.18164Z" fill="white"/></svg>'
    const navigation = useNavigation();

    const onDayPress = () => {
        navigation.navigate("JobOffer", {offer: {}, JobEventId: 1});
    }

    // const dateFormat = new Date(date.timestamp)
    // console.log(dateFormat)

    return (
        <Wrapper activeOpacity={0.7} onPress={onDayPress}>
            <View style={{...styles.container, ...styles.border}}>
                <AppText style={{...BaseCalendarIconStyles.title}}>
                    {date.day ? date.day : date}
                </AppText>
                <View style={styles.icon}>
                    <SvgUri svgXmlData={NewJobOfferIcon}/>
                </View>
            </View>
        </Wrapper>
    )
}

NewJobOffer.propTypes = {
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

export default memo(NewJobOffer);
