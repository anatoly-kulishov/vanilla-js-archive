import React, {memo, useEffect, useState} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {Calendar} from 'react-native-calendars';
import SvgUri from "expo-svg-uri";
import moment from "moment";
import {THEME} from "../../../theme";
import {CalendarStyles} from "../../../styles";
import {AppText} from "../../../components/ui/AppText";
import {AppButton} from "../../../components/ui/AppButton";
import {addRangesDate} from "../../../store/actions/calendarActions";
import {getFlag, getRangeDate} from "../../../store/selectors/calendar-selectors";

const DatesRange = ({navigation}) => {
    // Other hooks
    const dispatch = useDispatch();

    // Selectors
    const selectedRangeDays = useSelector(getRangeDate);
    const flag = useSelector(getFlag);

    // States
    const currentDate = new Date().toISOString().slice(0, 10);
    const currentDateMarked = {[currentDate]: {marked: true, dotColor: THEME.INDIGO_COLOR}};
    const [markedDates, setMarkedDates] = useState({});
    const [startDay, setStartDay] = useState(null);
    const [endDay, setEndDay] = useState(null);
    const [differenceDays, setDifferenceDays] = useState({});

    // Actions
    const onDayPress = day => {
        if (!startDay) {
            setStartDay(() => ({
                [day.dateString]: {
                    startingDay: true,
                    color: THEME.PRIMARY_COLOR_2,
                    textColor: 'white',
                    timestamp: day.timestamp
                }
            }))
        } else {
            const flag = startDay ? Object.values(startDay)[0].timestamp : null;
            if (day.timestamp > flag && !endDay) {
                let startDayUTC = new Date(Object.keys(startDay)[0]);
                let endDayUTC = new Date(day.dateString);
                let diffTime = new Date(endDayUTC.getTime() - startDayUTC.getTime());
                let diffDays = diffTime.getUTCDate() - 2;
                for (let i = diffDays; i > 0; i--) {
                    let currentDiffDay = moment(endDayUTC).subtract(i, 'days');
                    let currentDiffDayString = currentDiffDay.toISOString().slice(0, 10);
                    setDifferenceDays(prev => ({
                        ...prev,
                        [currentDiffDayString]: {color: "#EFF6FF", textColor: '#60A5FA'}
                    }));
                }
                setEndDay({
                    [day.dateString]: {
                        endingDay: true,
                        color: THEME.PRIMARY_COLOR_2,
                        textColor: 'white',
                        timestamp: day.timestamp
                    }
                })
            }
        }
    }

    // SideEffects
    useEffect(() => {
        dispatch(addRangesDate({
            ...startDay,
            ...differenceDays,
            ...endDay,
        }))
    }, [startDay, endDay])

    useEffect(() => {
        setMarkedDates({
            ...currentDateMarked,
            ...selectedRangeDays,
        })
    }, [selectedRangeDays])

    useEffect(() => {
        console.log("useEffect([flag])")
        setStartDay(null)
        setEndDay(null)
        setDifferenceDays({})
    }, [flag])

    return (
        <ScrollView style={{backgroundColor: '#fff'}}>
            <View style={styles.container}>
                <View>
                    <Calendar
                        onDayPress={onDayPress}
                        firstDay={1}
                        disableAllTouchEventsForDisabledDays
                        theme={CalendarStyles}
                        markingType={'period'}
                        markedDates={markedDates}
                    />
                </View>
                {(Object.keys(selectedRangeDays).length !== 0) ? (
                    <View style={{marginVertical: 15}}>
                        <AppButton
                            onPress={() => navigation.navigate("CalendarConfirmation",
                                {
                                    type: 'range',
                                    status: "fullyAvailable",
                                    startDay,
                                    endDay
                                })}
                            style={{marginBottom: 8}}
                            bgColor={THEME.MAIN_COLOR}>Fully available</AppButton>
                        <AppButton
                            onPress={() => navigation.navigate("CalendarEditingAvailability",
                                {
                                    type: 'range',
                                    status: "partlyAvailable",
                                    startDay,
                                    endDay,
                                })}
                            style={{marginBottom: 8}}
                            bgColor={THEME.SECONDARY_COLOR}
                            color={THEME.MAIN_COLOR}>Partly available</AppButton>
                        <AppButton
                            onPress={() => navigation.navigate("CalendarConfirmation", {
                                type: 'range',
                                status: "notAvailable",
                                startDay,
                                endDay
                            })}
                            bgColor={THEME.DANGER_BG_COLOR}
                            color={THEME.DANGER_COLOR}>Not available</AppButton>
                    </View>
                ) : (
                    <View style={styles.alert}>
                        <SvgUri style={styles.alertIcon} source={require("../../../images/attention.svg")}/>
                        <AppText style={styles.alertTitle}>
                            Different lorem ipsum dolor , consectetur adipiscing elit. Justo, blandit urna sed aliquam
                            est elit massa a faucibus. Etiam vestibulum dictumst dignissim.
                        </AppText>
                    </View>
                )}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        height: '100%',
    },
    buttonsBox: {
        marginVertical: 25
    },
    alert: {
        marginVertical: 15,
        paddingVertical: 12,
        paddingLeft: 55,
        paddingRight: 15,
        backgroundColor: THEME.PRIMARY_COLOR
    },
    alertTitle: {
        fontSize: 15,
        lineHeight: 24,
        color: THEME.GREY_COLOR_3,
    },
    alertIcon: {
        position: 'absolute',
        top: '50%',
        left: 15,
    }
})

export default memo(DatesRange);
