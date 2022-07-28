import React, {memo} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import {THEME} from "../../../theme";
import {AppText} from "../../../components/ui/AppText";
import Today from "../../../components/calendar/Today";
import JobLogMissing from "../../../components/calendar/JobLogMissing";
import JobLogFilled from "../../../components/calendar/JobLogFilled";
import FullyAvailable from "../../../components/calendar/FullyAvailable";
import PartlyAvailable from "../../../components/calendar/PartlyAvailable";
import NotAvailable from "../../../components/calendar/NotAvailable";
import NotAvailableSickLeave from "../../../components/calendar/NotAvailableSickLeave";
import NotAvailableOtherReason from "../../../components/calendar/NotAvailableOtherReason";
import NewJobOffer from "../../../components/calendar/NewJobOffer";
import MultipleJobOffer from "../../../components/calendar/MultipleJobOffer";
import AcceptedJobOffer from "../../../components/calendar/AcceptedJobOffer";
import OfferIgnored from "../../../components/calendar/OfferIgnored";
import OfferDeclined from "../../../components/calendar/OfferDeclined";

const Designations = () => {
    const dayNow = new Date().getDate();

    return (
        <ScrollView style={{backgroundColor: '#fff'}}>
            <View style={styles.container}>
                <View style={styles.example}>
                    <View style={styles.exampleItem}>
                        <Today date={dayNow}/>
                    </View>
                    <AppText style={styles.exampleTitle}>Today indicator</AppText>
                </View>
                <View style={styles.example}>
                    <View style={styles.exampleItem}>
                        <JobLogMissing date={dayNow}/>
                    </View>
                    <AppText style={styles.exampleTitle}>Job log missing</AppText>
                </View>
                <View style={styles.example}>
                    <View style={styles.exampleItem}>
                        <JobLogFilled date={dayNow}/>
                    </View>
                    <AppText style={styles.exampleTitle}>Job log filled</AppText>
                </View>
                <View style={styles.example}>
                    <View style={styles.exampleItem}>
                        <FullyAvailable date={dayNow}/>
                    </View>
                    <AppText style={styles.exampleTitle}>Fully available</AppText>
                </View>
                <View style={styles.example}>
                    <View style={styles.exampleItem}>
                        <PartlyAvailable date={dayNow}/>
                    </View>
                    <AppText style={styles.exampleTitle}>Partly available</AppText>
                </View>
                <View style={styles.example}>
                    <View style={styles.exampleItem}>
                        <NotAvailable date={dayNow}/>
                    </View>
                    <AppText style={styles.exampleTitle}>Not available</AppText>
                </View>
                <View style={styles.example}>
                    <View style={styles.exampleItem}>
                        <NotAvailableSickLeave date={dayNow}/>
                    </View>
                    <AppText style={styles.exampleTitle}>Not available, sick leave</AppText>
                </View>
                <View style={styles.example}>
                    <View style={styles.exampleItem}>
                        <NotAvailableOtherReason date={dayNow}/>
                    </View>
                    <AppText style={styles.exampleTitle}>Not available, other reason</AppText>
                </View>
                <View style={styles.example}>
                    <View style={styles.exampleItem}>
                        <NewJobOffer date={dayNow}/>
                    </View>
                    <AppText style={styles.exampleTitle}>New job offer</AppText>
                </View>
                <View style={styles.example}>
                    <View style={styles.exampleItem}>
                        <MultipleJobOffer date={dayNow}/>
                    </View>
                    <AppText style={styles.exampleTitle}>Multiple offers/orders</AppText>
                </View>
                <View style={styles.example}>
                    <View style={styles.exampleItem}>
                        <AcceptedJobOffer date={dayNow}/>
                    </View>
                    <AppText style={styles.exampleTitle}>Accepted job offer</AppText>
                </View>
                <View style={styles.example}>
                    <View style={styles.exampleItem}>
                        <OfferIgnored date={dayNow}/>
                    </View>
                    <AppText style={styles.exampleTitle}>Offer ignored for 24hrs</AppText>
                </View>
                <View style={styles.example}>
                    <View style={styles.exampleItem}>
                        <OfferDeclined date={dayNow}/>
                    </View>
                    <AppText style={styles.exampleTitle}>Offer declined</AppText>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        paddingVertical: 25,
        paddingHorizontal: 15
    },
    example: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        borderBottomWidth: 1,
        borderColor: THEME.BORDER_MAIN_COLOR,
        backgroundColor: THEME.GREY_COLOR_2
    },
    exampleItem: {
        width: 32,
        height: 32,
    },
    exampleTitle: {
        marginLeft: 12
    }
})

export default memo(Designations)
