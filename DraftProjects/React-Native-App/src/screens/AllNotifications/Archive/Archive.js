import React, {memo} from 'react';
import {StyleSheet, ScrollView, View, Platform, TouchableNativeFeedback, TouchableOpacity} from 'react-native';
import SvgUri from "expo-svg-uri";
import {BoxesStyles} from "../../../styles";
import {AppText} from "../../../components/ui/AppText";
import {useSelector} from "react-redux";
import {getEmployees, getEmployeesIsLoading} from "../../../store/selectors/employees-selectors";
import {AppLoader} from "../../../components/ui/AppLoader";
import moment from "moment";

const Archive = () => {
    const Wrapper = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
    const employees = useSelector(getEmployees);
    const isLoading = useSelector(getEmployeesIsLoading);

    return (
        <ScrollView style={{backgroundColor: '#fff'}}>
            <View style={styles.container}>
                {isLoading && <AppLoader/>}
                {!isLoading && (
                    employees && employees.map(data =>
                        data.ReceivedOffers
                            .filter(event => event.JobEvent.phase === 'log' && event.JobEvent.status === 'completed')
                            .map(event => (
                                <Wrapper onPress={() => null}>
                                    <View style={styles.box}>
                                        <View style={styles.boxTitleWrap}>
                                            <AppText style={styles.boxTitle}>{event.description}</AppText>
                                        </View>
                                        <AppText style={styles.boxDesc}>Job Location...</AppText>
                                        <AppText
                                            style={styles.boxDesc}>{moment(event.createdAt).startOf('hour').fromNow()}</AppText>
                                        <View style={styles.arrow}>
                                            <SvgUri style={styles.arrowImg}
                                                    source={require("../../../images/arrow-right.svg")}/>
                                        </View>
                                    </View>
                                </Wrapper>
                            ))))}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        padding: 15
    },
    ...BoxesStyles,
})

export default memo(Archive);
