import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import PropTypes from "prop-types";
import moment from "moment";
import {JobStyles} from "../../../../styles";
import {AppTextBold} from "../../../../components/ui/AppTextBold";
import {AppText} from "../../../../components/ui/AppText";

const Default = ({data}) => {
    return (
        <>
            <View style={{marginBottom: 25}}>
                <AppTextBold style={styles.title}>Job role {data?.JobEvent?.JobRoleId}</AppTextBold>
                <View style={styles.row}>
                    <AppText style={styles.dt}>Task:</AppText><AppText style={styles.dd}>Task name...</AppText>
                </View>
            </View>
            <View style={styles.section}>
                <AppText style={styles.subTitle}>Address</AppText>
                <View style={styles.box}>
                    <AppTextBold style={styles.boxTitle}>Job Location</AppTextBold>
                    <AppText style={styles.boxDesc}>address...</AppText>
                </View>
            </View>
            <View style={styles.section}>
                <AppText style={styles.subTitle}>Time</AppText>
                <View style={styles.box}>
                    <View style={{...styles.row, marginBottom: 6}}>
                        <AppText style={styles.dt}>Date:</AppText>
                        <AppTextBold style={{...styles.dd, fontSize: 16}}>
                            {moment(data?.JobEvent?.start).format('L')} - {moment(data?.JobEvent?.end).format('L')}
                        </AppTextBold>
                    </View>
                    <View style={{...styles.row, marginBottom: 6}}>
                        <View style={{...styles.row, width: 140}}>
                            <AppText style={styles.dt}>Start:</AppText>
                            <AppTextBold style={{...styles.dd, fontSize: 16}}>
                                {moment(data?.JobEvent?.start).format('h:mm a')}
                            </AppTextBold>
                        </View>
                        <View style={{...styles.row, ...styles.subRow}}>
                            <AppText style={styles.dt}>End:</AppText>
                            <AppTextBold style={{...styles.dd, fontSize: 16}}>
                                {moment(data?.JobEvent?.end).format('h:mm a')}
                            </AppTextBold>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <AppText style={styles.dt}>Length:</AppText>
                        <AppTextBold style={{...styles.dd, fontSize: 16}}>
                            {moment.duration(moment(data?.JobEvent?.end).diff(moment(data?.JobEvent?.start))).hours()} hrs
                        </AppTextBold>
                    </View>
                </View>
            </View>
            <View style={styles.section}>
                <AppText style={styles.subTitle}>Description</AppText>
                <View style={styles.box}>
                    <AppText style={{...styles.boxDesc, marginBottom: 6}}>{data?.description}</AppText>
                </View>
            </View>
            <View style={styles.section}>
                <AppText style={styles.subTitle}>Requied skills</AppText>
                <View style={{...styles.row, marginTop: 4}}>
                    <View style={styles.badge}><AppText style={styles.badgeText}>skillOne</AppText></View>
                    <View style={styles.badge}><AppText style={styles.badgeText}>skillTwo</AppText></View>
                    <View style={styles.badge}><AppText style={styles.badgeText}>skillThree</AppText></View>
                    <View style={styles.badge}><AppText style={styles.badgeText}>skillFour</AppText></View>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create(JobStyles);

Default.propTypes = {
    data: PropTypes.object
}

export default memo(Default);
