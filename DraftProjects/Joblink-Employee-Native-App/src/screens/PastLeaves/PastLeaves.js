import React, {memo} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import {THEME} from "../../theme";
import {AppText} from "../../components/ui/AppText";

const PastLeaves = () => {
    return (
        <ScrollView style={{backgroundColor: '#fff'}}>
            <View style={styles.container}>
                <View style={styles.section}>
                    <AppText style={styles.label}>Current leave</AppText>
                    <View style={styles.frame}>
                        <View style={styles.box}>
                            <AppText style={{...styles.boxTitle, color: THEME.WARNING_COLOR}}>Sick leave</AppText>
                            <AppText style={styles.boxSubTitle}>From 4. Feb 2021 to 14. Feb 2021</AppText>
                        </View>
                    </View>
                </View>
                <View style={styles.section}>
                    <AppText style={styles.label}>Past leaves</AppText>
                    <View style={styles.frame}>
                        <View style={styles.box}>
                            <AppText style={styles.boxTitle}>Sick leave</AppText>
                            <AppText style={styles.boxSubTitle}>29. Dec 2020 - 11. Jan 2021</AppText>
                        </View>
                        <View style={styles.box}>
                            <AppText style={styles.boxTitle}>Sick leave</AppText>
                            <AppText style={styles.boxSubTitle}>29. Dec 2020 - 11. Jan 2021</AppText>
                        </View>
                        <View style={styles.box}>
                            <AppText style={styles.boxTitle}>Sick leave</AppText>
                            <AppText style={styles.boxSubTitle}>29. Dec 2020 - 11. Jan 2021</AppText>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        height: '100%'
    },
    section: {
        marginBottom: 25
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
        padding: 12,
        borderBottomWidth: 1,
        borderColor: THEME.GREY_COLOR,
        backgroundColor: THEME.GREY_COLOR_2
    },
    boxTitle: {
        fontSize: 16,
        marginBottom: 4,
    },
    boxSubTitle: {
        fontSize: 13,
    },
})

export default memo(PastLeaves);
