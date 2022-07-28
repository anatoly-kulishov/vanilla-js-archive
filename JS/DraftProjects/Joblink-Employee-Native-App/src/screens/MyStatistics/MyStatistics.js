import React, {memo} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import {THEME} from "../../theme";
import {AppText} from "../../components/ui/AppText";

const MyStatistics = () => {
    return (
        <ScrollView style={{backgroundColor: '#fff'}}>
            <View style={styles.container}>
                <View style={styles.section}>
                    <AppText style={styles.label}>Statistics</AppText>
                    <View style={styles.frame}>
                        <View style={styles.box}>
                            <View style={styles.flexCenter}>
                                <View style={{...styles.dot, ...styles.dotSuccess}}/>
                                <AppText style={styles.boxTitle}>Accepted</AppText>
                            </View>
                            <View>
                                <AppText style={styles.boxSubTitle}>9 jobs</AppText>
                            </View>
                        </View>
                        <View style={styles.box}>
                            <View style={styles.flexCenter}>
                                <View style={{...styles.dot, ...styles.dotDanger}}/>
                                <AppText style={styles.boxTitle}>Rejected</AppText>
                            </View>
                            <View>
                                <AppText style={styles.boxSubTitle}>6 jobs</AppText>
                            </View>
                        </View>
                        <View style={styles.box}>
                            <View style={styles.flexCenter}>
                                <View style={{...styles.dot, ...styles.dotWarning}}/>
                                <AppText style={styles.boxTitle}>Ignored</AppText>
                            </View>
                            <View>
                                <AppText style={styles.boxSubTitle}>3 jobs</AppText>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        padding: 15
    },
    section: {
        marginBottom: 15,
    },
    label: {
        marginBottom: 8,
        fontSize: 15,
        color: "#71717A"
    },
    frame: {
        borderWidth: 1,
        borderRadius: 4,
        borderColor: THEME.GREY_COLOR,
    },
    box: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 12,
        borderBottomWidth: 1,
        borderColor: THEME.GREY_COLOR,
        backgroundColor: THEME.GREY_COLOR_2
    },
    boxTitle: {
        fontSize: 16,
    },
    boxSubTitle: {
        fontSize: 15,
        color: THEME.GREY_COLOR_3
    },
    flexCenter: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    dot: {
        width: 14,
        height: 14,
        borderRadius: 50,
        marginTop: 2,
        marginRight: 14
    },
    dotSuccess: {
        backgroundColor: THEME.MAIN_COLOR
    },
    dotDanger: {
        backgroundColor: THEME.DANGER_COLOR
    },
    dotWarning: {
        backgroundColor: THEME.WARNING_COLOR
    },
})

export default memo(MyStatistics);
