import React, {Fragment, memo, useState} from 'react';
import {StyleSheet, ScrollView, View, Platform, TouchableNativeFeedback, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import moment from "moment";
import {THEME} from "../../../theme";
import hoursData from "../../../mock/hoursData";
import {AppText} from "../../../components/ui/AppText";
import {AppButton} from "../../../components/ui/AppButton";
import {AppTextBold} from "../../../components/ui/AppTextBold";
import {AppSelect} from "../../../components/ui/AppSelect";
import {clearAllSelectedDate, createAnAvailability} from "../../../store/actions/calendarActions";

const EditingAvailability = props => {
    const {route, navigation} = props;
    const dispatch = useDispatch();
    const Wrapper = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
    const [hoursSettings, setHoursSettings] = useState('');
    const flagChange = useSelector(state => state.calendar.flag);
    let daysState = null;
    let daysArray = [];
    let startDay = null;
    let endDay = null;

    if (route.params.type === 'range') {
        daysState = useSelector(state => state.calendar.rangeDate);
        daysArray = Object.keys(daysState);
        startDay = daysArray[0];
        endDay = daysArray[daysArray.length - 1];
    } else if (route.params.type === 'selection') {
        daysState = useSelector(state => state.calendar.selectionDate);
        daysArray = Object.keys(daysState);
    }

    const start = new Date(startDay);
    const end = new Date(endDay);
    const startTime = moment(start).utc(false).format('LT');
    const endTime = moment(end).utc(false).format('LT');

    const timeEditScreenOptions = {
        start: JSON.stringify(start),
        end: JSON.stringify(end)
    }

    const onDoneHandler = (start, end) => {
        dispatch(createAnAvailability(start, end));
        dispatch(clearAllSelectedDate());
        navigation.navigate("MainCalendar", {flag: !flagChange});
    }

    return (
        <ScrollView style={{backgroundColor: '#fff'}}>
            <View style={styles.container}>
                <View style={{marginBottom: 24}}>
                    <AppText style={styles.label}>Dates</AppText>
                    {startDay && endDay ? (
                        <Fragment>
                            <View style={styles.box}>
                                <AppText style={styles.dt}>Start date:</AppText>
                                <AppTextBold
                                    style={styles.dd}>{startDay ? startDay : 'NuN'}</AppTextBold>
                            </View>
                            <View style={styles.box}>
                                <AppText style={styles.dt}>End date:</AppText>
                                <AppTextBold
                                    style={styles.dd}>{endDay ? endDay : 'NuN'}</AppTextBold>
                            </View>
                        </Fragment>
                    ) : (daysArray.map((day, number) => {
                        return (
                            <View key={number} style={styles.box}>
                                <AppTextBold
                                    style={styles.dd}>{day}</AppTextBold>
                            </View>
                        )
                    }))}
                </View>
                <View>
                    <AppSelect
                        label="Hours"
                        data={hoursData}
                        selectedValue={hoursSettings}
                        setSelectedValue={setHoursSettings}/>
                </View>
                <View>
                    <View style={styles.date}>
                        <View style={styles.flexBox}>
                            <Wrapper
                                onPress={() => navigation.navigate("TimeEditScreen", timeEditScreenOptions)}>
                                <View style={{...styles.box, ...styles.dateBox}}>
                                    <AppText style={styles.dt}>From:</AppText>
                                    <AppTextBold>{startTime}</AppTextBold>
                                </View>
                            </Wrapper>
                        </View>
                        <View style={styles.flexBox}>
                            <Wrapper onPress={() => navigation.navigate("TimeEditScreen", timeEditScreenOptions)}>
                                <View style={{...styles.box, ...styles.dateBox}}>
                                    <AppText style={styles.dt}>To:</AppText>
                                    <AppTextBold>{endTime}</AppTextBold>
                                </View>
                            </Wrapper>
                        </View>
                    </View>
                    <View style={styles.btnGroup}>
                        <View style={{...styles.flexBox, marginRight: 8}}>
                            <AppButton
                                bgColor={THEME.DANGER_BG_COLOR}
                                color={THEME.DANGER_COLOR}>Clear all</AppButton>
                        </View>
                        <View style={styles.flexBox}>
                            <AppButton
                                bgColor={THEME.SECONDARY_COLOR}
                                color={THEME.MAIN_COLOR}>Add more</AppButton>
                        </View>
                    </View>
                </View>
                <View style={{marginVertical: 25}}>
                    <AppButton onPress={() => onDoneHandler(start, end)}
                               bgColor={THEME.MAIN_COLOR}>Done</AppButton>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        height: '100%',
    },
    label: {
        marginBottom: 5,
        fontSize: 15
    },
    date: {
        flexDirection: "row",
        justifyContent: 'center',
        marginBottom: 15,
    },
    dateBox: {
        width: "100%"
    },
    box: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderWidth: 1,
        borderColor: THEME.GREY_COLOR,
        backgroundColor: THEME.GREY_COLOR_2
    },
    dt: {
        marginRight: 4,
        fontSize: 15
    },
    dd: {
        fontSize: 17
    },
    btnGroup: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    flexBox: {
        width: "49%"
    }
})

export default memo(EditingAvailability);