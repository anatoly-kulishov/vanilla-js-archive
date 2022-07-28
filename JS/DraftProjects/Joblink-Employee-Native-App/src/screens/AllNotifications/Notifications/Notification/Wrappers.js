import React, {memo} from 'react';
import {Platform, StyleSheet, TouchableNativeFeedback, TouchableOpacity, View} from 'react-native';
import SvgUri from "expo-svg-uri";
import moment from "moment";
import {BoxesStyles} from "../../../../styles";
import {AppText} from "../../../../components/ui/AppText";

const Wrapper = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

export const NewEventNotification = memo(props => {
    return (
        <Wrapper key={props.id} onPress={() => props.getInfo(props.JobEventId)}>
            <View style={{...styles.box, ...styles.boxActive}}>
                <View style={styles.boxTitleWrap}>
                    <View style={styles.activeDot}/>
                    <AppText style={styles.boxTitle}>{props.description} {props.JobEventId}</AppText>
                </View>
                <AppText style={styles.boxSubTitle}>Job role Id {props.JobEvent.JobRoleId}</AppText>
                <AppText style={styles.boxDesc}>Job Location...</AppText>
                <AppText
                    style={styles.boxDesc}>{moment(props?.createdAt).startOf('hour').fromNow()}</AppText>
                <AppText
                    style={styles.boxSubTitle}>{props.SentEmployees.type} {props.JobEvent.phase}</AppText>
                <View style={styles.arrow}>
                    <SvgUri style={styles.arrowImg} source={require("../../../../images/arrow-right.svg")}/>
                </View>
            </View>
        </Wrapper>
    )
})

export const EventNotification = memo(props => {
    return (
        <Wrapper key={props.id} onPress={() => props.getInfo(props.JobEventId)}>
            <View style={styles.box}>
                <View style={styles.boxTitleWrap}>
                    <AppText style={styles.boxTitle}>{props.description} {props.JobEventId}</AppText>
                </View>
                <AppText style={styles.boxSubTitle}>Job role
                    Id {props.JobEvent.JobRoleId}</AppText>
                <AppText style={styles.boxDesc}>Job Location...</AppText>
                <AppText
                    style={styles.boxDesc}>{moment(props?.createdAt).startOf('hour').fromNow()}</AppText>
                <AppText
                    style={styles.boxSubTitle}>{props.SentEmployees.type} {props.JobEvent.phase}</AppText>
                <View style={styles.arrow}>
                    <SvgUri style={styles.arrowImg} source={require("../../../../images/arrow-right.svg")}/>
                </View>
            </View>
        </Wrapper>
    )
})

const styles = StyleSheet.create(BoxesStyles);