import React, {useState} from 'react';
import {Platform, StyleSheet, TouchableNativeFeedback, TouchableOpacity, View} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";
import {AppButton} from "../../components/ui/AppButton";
import {THEME} from "../../theme";
import {AppText} from "../../components/ui/AppText";
import {AppTextBold} from "../../components/ui/AppTextBold";

const TimeEdit = props => {
    const {route, navigation} = props;
    const Wrapper = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
    const mode = 'time';

    const start = Date.parse(JSON.parse(route?.params.start));
    const end = Date.parse(JSON.parse(route?.params.end));

    const [startTime, setStartTime] = useState(start);
    const [endTime, setEndTime] = useState(end);
    const [showStartTime, setShowStartTime] = useState(false);
    const [showEndTime, setShowEndTime] = useState(false);
    const startTimeActiveStyles = (showStartTime) ? '#F0FDF4' : THEME.GREY_COLOR_2;
    const endTimeActiveStyles = (showEndTime) ? '#F0FDF4' : THEME.GREY_COLOR_2;

    const onChangeStartTime = (event, selectedDate) => {
        const currentStartTime = selectedDate || startTime;
        setShowStartTime(Platform.OS === 'ios')
        setStartTime(currentStartTime);
    };

    const onChangeEndTime = (event, selectedDate) => {
        const currentEndTime = selectedDate || endTime;
        setShowEndTime(Platform.OS === 'ios');
        setEndTime(currentEndTime);
    };

    const onShowStartTime = () => {
        setShowEndTime(false);
        setShowStartTime(true);
    };

    const onShowEndTime = () => {
        setShowStartTime(false);
        setShowEndTime(true);
    };

    const doneEditTime = () => {
        navigation.setParams({
            start: startTime,
            end: endTime
        })
        // console.log(route.params)
        navigation.goBack();
    }


    return (
        <View style={styles.container}>
            <View style={{...styles.row}}>
                <Wrapper activeOpacity={0.7}
                         onPress={onShowStartTime}>
                    <View style={{...styles.timeBox, backgroundColor: startTimeActiveStyles}}>
                        <AppText style={styles.dt}>Start:</AppText>
                        <AppTextBold style={styles.dd}>{moment(startTime).format('LT')}</AppTextBold>
                    </View>
                </Wrapper>
                <Wrapper activeOpacity={0.7}
                         onPress={onShowEndTime}>
                    <View style={{...styles.timeBox, backgroundColor: endTimeActiveStyles}}>
                        <AppText style={styles.dt}>End:</AppText>
                        <AppTextBold style={styles.dd}>{moment(endTime).format('LT')}</AppTextBold>
                    </View>
                </Wrapper>
            </View>
            <View>
                {showStartTime && (
                    (Platform.OS === 'ios') ? (
                        <View style={styles.timePickerBox}>
                            <AppText style={styles.timePickerBoxTitle}>Start Time:</AppText>
                            <DateTimePicker
                                testID="startTimePicker"
                                mode={mode}
                                is24Hour={true}
                                display="spinner"
                                value={startTime}
                                onChange={onChangeStartTime}
                            />
                        </View>
                    ) : (
                        <DateTimePicker
                            testID="startTimePicker"
                            mode={mode}
                            is24Hour={true}
                            display="default"
                            value={startTime}
                            onChange={onChangeStartTime}
                        />
                    )
                )}
                {showEndTime && (
                    (Platform.OS === 'ios') ? (
                        <View style={styles.timePickerBox}>
                            <AppText style={styles.timePickerBoxTitle}>End Time:</AppText>
                            <DateTimePicker
                                testID="endTimePicker"
                                mode={mode}
                                is24Hour={true}
                                display="spinner"
                                value={endTime}
                                onChange={onChangeEndTime}
                            />
                        </View>
                    ) : (
                        <DateTimePicker
                            testID="endTimePicker"
                            mode={mode}
                            is24Hour={true}
                            display="default"
                            value={endTime}
                            onChange={onChangeEndTime}
                        />
                    )
                )}
            </View>
            <View style={{...styles.row, marginTop: 15}}>
                <AppButton onPress={() => navigation.goBack()}
                           style={{...styles.btn, marginRight: 11}}
                           color={THEME.MAIN_COLOR}
                           bgColor={THEME.SECONDARY_COLOR}>
                    Cancel
                </AppButton>
                <AppButton onPress={doneEditTime}
                           style={styles.btn}
                           bgColor={THEME.MAIN_COLOR}>Done
                </AppButton>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        paddingHorizontal: 15,
        height: '100%',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    btn: {
        minWidth: 140
    },
    timePickerBox: {
        height: 220
    },
    timePickerBoxTitle: {
        marginTop: 15,
        fontSize: 15,
        textAlign: 'center'
    },
    timeBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 150,
        padding: 12,
        borderWidth: 2,
        borderColor: "#DCFCE7"
    },
    dt: {
        fontSize: 15,
        marginRight: 4
    },
    dd: {
        fontSize: 16,
    }
})

export default TimeEdit;
