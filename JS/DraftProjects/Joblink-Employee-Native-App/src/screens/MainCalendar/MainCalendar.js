import React, {memo, useEffect, useState} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {Calendar} from 'react-native-calendars';
import PropTypes from "prop-types";
import SvgUri from "expo-svg-uri";
import moment from "moment";
import {THEME} from "../../theme";
import {CalendarStyles} from "../../styles";
import {AppButton} from "../../components/ui/AppButton";
import {AppText} from "../../components/ui/AppText";
import DayComponent from "../../components/calendar/DayComponent";
import {getAllAvailabilities} from "../../store/actions/calendarActions";
import {filterEventsForCalendarIcons} from "../../utils/helpers/calendar-helpers";
import {getEmployeesSelector} from "../../store/selectors/users-selectors";
import {DATE_FORMAT} from "../../constants";
import {getMyProfile} from "../../store/selectors/auth-selectors";
import {getAvailabilitiesDates, getFlag} from "../../store/selectors/calendar-selectors";

const MainCalendar = ({navigation}) => {
    // Other Hooks
    const dispatch = useDispatch();

    // Selectors
    const profile = useSelector(getMyProfile);
    const employees = useSelector(getEmployeesSelector);
    const availabilitiesDates = useSelector(getAvailabilitiesDates);
    const flag = useSelector(getFlag);

    // Calendar -> Current Day
    const currentDate = moment().format(DATE_FORMAT);
    const currentDateMarked = {[currentDate]: 'today'};

    // Calendar -> Init State
    const [markedDates, setMarkedDates] = useState({});
    const [differenceDays, setDifferenceDays] = useState({});
    const [flagChange, setFlagChange] = useState(false);

    // Calendar -> New Job Offers
    const [newJobOffers, setNewJobOffers] = useState({});
    useEffect(() => {
        const NewJobOffers = employees[0]?.ReceivedOffers
            .filter(offer => offer.JobEvent.phase === 'offer' && offer.SentEmployees.type === 'not_responded')
            .map(offer => moment(offer.JobEvent.start).format(DATE_FORMAT));

        filterEventsForCalendarIcons(NewJobOffers, 'NewJobOffer', setNewJobOffers, flagChange, setFlagChange);
    }, [employees])

    // Calendar -> Accepted Offers
    const [acceptedOffers, setAcceptedOffers] = useState({});
    useEffect(() => {
        const AcceptedOffers = employees[0]?.AcceptedOffers
            .filter(offer => offer.JobEvent.phase === 'offer' && offer.JobEvent.status === 'filled')
            .map(offer => moment(offer.JobEvent.start).format(DATE_FORMAT))

        filterEventsForCalendarIcons(AcceptedOffers, 'AcceptedJobOffer', setAcceptedOffers, flagChange, setFlagChange);
    }, [employees])

    // Calendar -> Offer Ignored
    const [ignoredOffers, setIgnoredOffers] = useState({});
    useEffect(() => {
        const IgnoredOffers = employees[0]?.ReceivedOffers
            .filter(offer => {
                if (offer.JobEvent.phase === 'offer' && offer.JobEvent.status === 'open') {
                    if (offer.SentEmployees.type === 'not_responded' && moment().diff(offer.SentEmployees.createdAt, 'day') >= 1)
                        return offer
                }
            })
            .map(offer => moment(offer.JobEvent.end).format(DATE_FORMAT))

        filterEventsForCalendarIcons(IgnoredOffers, 'OfferIgnored', setIgnoredOffers, flagChange, setFlagChange);
    }, [employees])

    // Calendar -> Job Log Missing
    const [offerDeclined, setOfferDeclined] = useState({});
    useEffect(() => {
        const OfferDeclined = employees[0]?.ReceivedOffers
            .filter(offer => offer.JobEvent.phase === 'offer' && offer.JobEvent.status === 'open' && offer.SentEmployees.type === 'rejected')
            .map(offer => moment(offer.JobEvent.start).format(DATE_FORMAT))

        filterEventsForCalendarIcons(OfferDeclined, 'OfferDeclined', setOfferDeclined, flagChange, setFlagChange);
    }, [employees])

    // Calendar -> Job log filled
    const [jobLogFilled, setJobLogFilled] = useState({});
    useEffect(() => {
        const JobLogFilled = employees[0]?.ReceivedOffers
            .filter(offer => offer.JobEvent.phase === 'log' && offer.JobEvent.status === 'completed')
            .map(offer => moment(offer.JobEvent.start).format(DATE_FORMAT))

        filterEventsForCalendarIcons(JobLogFilled, 'JobLogFilled', setJobLogFilled, flagChange, setFlagChange);
    }, [employees])

    // Calendar -> Job Log Missing
    const [jobLogMissing, setJobLogMissing] = useState({});
    useEffect(() => {
        const JobLogMissing = employees[0]?.ReceivedOffers
            .filter(offer => offer.JobEvent.phase === 'log' && offer.JobEvent.status === 'filled')
            .map(offer => moment(offer.JobEvent.start).format(DATE_FORMAT))

        filterEventsForCalendarIcons(JobLogMissing, 'JobLogMissing', setJobLogMissing, flagChange, setFlagChange);
    }, [employees])

    // Calendar -> Multiple offers/orders
    const [multipleEvents, setMultipleEvents] = useState({});
    useEffect(() => {
        const ReceivedOffers = employees[0]?.ReceivedOffers
            .filter(offer => offer.JobEvent.phase === 'offer' && offer.SentEmployees.type === 'not_responded')
            .map(offer => moment(offer.JobEvent.start).format(DATE_FORMAT))
        const MultipleEvents = ReceivedOffers?.filter((item, index) => ReceivedOffers.indexOf(item) !== index)
        filterEventsForCalendarIcons(MultipleEvents, 'MultipleJobOffer', setMultipleEvents, flagChange, setFlagChange);
    }, [employees])

    // Redux -> Getting All Availabilities Dates
    useEffect(() => {
        if (profile?.id) {
            dispatch(getAllAvailabilities(profile.id));
        }
    }, [dispatch, profile])

    // Calculate the difference between startDay and endDay
    useEffect(() => {
        const availabilitiesDatesArray = availabilitiesDates.map(el => [
            el.start.slice(0, 10),
            el.end.slice(0, 10)
        ])
        availabilitiesDatesArray.forEach(date => {
            // Init data
            const startDay = date[0];
            const endDay = date[1];
            const startDayUTC = new Date(startDay);
            const endDayUFC = new Date(endDay);

            // Calculate
            const diffTime = new Date(endDayUFC.getTime() - startDayUTC.getTime());
            const diffDays = diffTime.getUTCDate() - 2;
            if (diffDays > 0) {
                for (let i = diffDays; i > 0; i--) {
                    let currentDiffDay = moment(endDayUFC).subtract(i, 'days');
                    let currentDiffDayString = currentDiffDay.toISOString().slice(0, 10);
                    setDifferenceDays(prev => ({
                        ...prev,
                        [startDay]: 'FullyAvailable',
                        [currentDiffDayString]: "FullyAvailable",
                        [endDay]: "FullyAvailable",
                    }));
                }
            } else {
                setDifferenceDays(prev => ({
                    ...prev,
                    [startDay]: 'FullyAvailable',
                    [endDay]: 'FullyAvailable',
                }));
            }
        })
        setFlagChange(!flagChange);
    }, [availabilitiesDates, flag])

    // Set all values in calendar state
    useEffect(() => {
        setMarkedDates({
            ...currentDateMarked,
            ...differenceDays,
            ...newJobOffers,
            ...multipleEvents,
            ...ignoredOffers,
            ...offerDeclined,
            ...acceptedOffers,
            ...jobLogMissing,
            ...jobLogFilled,
        })
    }, [flagChange, flag, employees])

    return (
        <ScrollView style={{backgroundColor: '#fff'}}>
            <View style={styles.container}>
                <View>
                    <Calendar
                        theme={CalendarStyles}
                        firstDay={1}
                        markingType={'custom'}
                        markedDates={markedDates}
                        dayComponent={({date, state, marking}) => (
                            <DayComponent
                                date={date}
                                state={state}
                                onDayPress={() => null}
                                marking={marking}/>
                        )}/>
                </View>
                <View style={styles.buttonsBox}>
                    <AppButton onPress={() => navigation.navigate("CalendarDateSelection")}
                               style={{marginBottom: 15}}
                               bgColor={THEME.MAIN_COLOR}>Dates selection</AppButton>
                    <AppButton onPress={() => navigation.navigate("CalendarDatesRange")}
                               bgColor={THEME.SECONDARY_COLOR}
                               color={THEME.MAIN_COLOR}>Dates range</AppButton>
                </View>
                <View>
                    <AppText>Upcoming Jobs</AppText>
                    <View style={styles.alert}>
                        <SvgUri style={styles.alertIcon} source={require("../../images/attention.svg")}/>
                        <AppText style={styles.alertTitle}>
                            Currently You don’t have any upcoming jobs.
                            Please, edit availability so employers may hire you.
                        </AppText>
                    </View>
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
        fontSize: 14,
        lineHeight: 24,
        color: THEME.GREY_COLOR_3,
    },
    alertIcon: {
        position: 'absolute',
        top: '50%',
        left: 15,
    }
})

MainCalendar.propTypes = {
    navigation: PropTypes.object,
    flag: PropTypes.bool,
    availabilitiesDates: PropTypes.array,
    getAllAvailabilities: PropTypes.func
}

export default memo(MainCalendar);
