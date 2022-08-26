import React, {memo, useState} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import {THEME} from "../../theme";
import {JobStyles} from "../../styles";
import {AppTextBold} from "../../components/ui/AppTextBold";
import {AppText} from "../../components/ui/AppText";
import {AppButton} from "../../components/ui/AppButton";
import {AppCheckBox} from "../../components/ui/AppCheckBox";
import PropTypes from "prop-types";

const JobLog = props => {
    const {navigation} = props;
    const [isSelected, setSelection] = useState(false);
    // const [comment, setComment] = useState('');

    return (
        <ScrollView style={styles.container}>
            <View style={{paddingBottom: 16}}>
                <View style={styles.alert}>
                    <AppText style={{...styles.alertText, marginBottom: 15}}>
                        Text explanation why this job log was rejected text explanation why this job log was rejected
                        text explanation why this job log was rejected text explanation why this job log was rejected
                        text explanation why this job log was.
                    </AppText>
                    <AppText style={{...styles.alertText, marginBottom: 15}}>
                        Please, edit something and send again
                    </AppText>
                    <AppButton onPress={() => navigation.navigate("Chat")}
                               color={THEME.WARNING_COLOR_2}
                               bgColor={THEME.WARNING_BG_COLOR_2}>
                        Contact support
                    </AppButton>
                </View>
                <View style={{marginBottom: 25}}>
                    <AppTextBold style={styles.title}>Job role</AppTextBold>
                    <View style={styles.row}>
                        <AppText style={styles.dt}>Task:</AppText><AppText style={styles.dd}>Task name 1</AppText>
                    </View>
                </View>
                <View style={styles.section}>
                    <AppText style={styles.subTitle}>Address</AppText>
                    <View style={styles.box}>
                        <AppTextBold style={styles.boxTitle}>Job Location</AppTextBold>
                        <AppText style={styles.boxDesc}>Mannerheimvägen 9, Helsinki</AppText>
                    </View>
                </View>
                <View style={styles.section}>
                    <AppText style={styles.subTitle}>Time</AppText>
                    <View style={styles.box}>
                        <View style={{...styles.row, marginBottom: 6}}>
                            <AppText style={styles.dt}>Date:</AppText>
                            <AppTextBold style={{...styles.dd, fontSize: 17}}>12. Helmikuu, 2020</AppTextBold>
                        </View>
                        <View style={{...styles.row, marginBottom: 6}}>
                            <View style={{...styles.row, width: 140}}>
                                <AppText style={styles.dt}>Start:</AppText>
                                <AppTextBold style={{...styles.dd, fontSize: 17}}>10:00</AppTextBold>
                            </View>
                            <View style={{...styles.row, ...styles.subRow}}>
                                <AppText style={styles.dt}>Start:</AppText>
                                <AppTextBold style={{...styles.dd, fontSize: 17}}>15:00</AppTextBold>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <AppText style={styles.dt}>Length:</AppText>
                            <AppTextBold style={{...styles.dd, fontSize: 17}}>5 hrs</AppTextBold>
                        </View>
                        <View style={{marginVertical: 10}}>
                            <AppButton onPress={() => console.log("navigation.navigate('TimeEdit')")}
                                       color={THEME.MAIN_COLOR}
                                       bgColor={THEME.SECONDARY_COLOR}>Edit time</AppButton>
                        </View>
                        <AppText style={styles.subTitle}>Lunch break:</AppText>
                        <View style={{...styles.row, justifyContent: 'space-between'}}>
                            <View>
                                <AppText style={{fontSize: 17, fontFamily: 'Inter-Medium'}}>30 min. lunch
                                    break</AppText>
                            </View>
                            <View>
                                <AppCheckBox
                                    containerStyle={{marginVertical: 5}}
                                    isSelected={isSelected}
                                    setSelection={setSelection}
                                    marginBottom={0}
                                />
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.section}>
                    <AppText style={styles.subTitle}>You rated jobLocationName as</AppText>
                    <View style={styles.box}>
                        <View style={styles.row}>
                            <AppButton style={{minWidth: "46%", marginRight: "8%"}}
                                       bgColor={THEME.SECONDARY_COLOR}
                                       color={THEME.MAIN_COLOR}>Good</AppButton>
                            <AppButton style={{minWidth: "46%"}}
                                       bgColor={THEME.DANGER_BG_COLOR}
                                       color={THEME.DANGER_COLOR}>Bad</AppButton>
                        </View>

                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    ...JobStyles,
    alert: {
        marginVertical: 15,
        padding: 12,
        backgroundColor: THEME.WARNING_BG_COLOR
    },
    alertText: {
        fontSize: 15,
        lineHeight: 20,
        color: THEME.WARNING_COLOR,
    },
    textArea: {
        height: 150,
        justifyContent: "flex-start",
    }
})

JobLog.propTypes = {
    navigation: PropTypes.object
}

export default memo(JobLog);
