import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import PropTypes from "prop-types";
import {THEME} from "../../theme";
import {AppText} from "../../components/ui/AppText";
import PersonalInfoForm from "./PersonalInfoForm";

const PersonalInfo = props => {
    const {navigation} = props;

    const submitInfoFormHandler = (values) => {
        console.log(values)
        navigation.navigate('OnBoardingNavigation');
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.alert}>
                <AppText style={styles.alertTitle}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Leo nulla velit lacus proin morbi libero ac.
                </AppText>
            </View>
            <PersonalInfoForm
                onSubmit={submitInfoFormHandler}
                navigation={navigation}/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        backgroundColor: '#fff',
    },
    alert: {
        marginVertical: 15,
        padding: 12,
        backgroundColor: THEME.WARNING_BG_COLOR
    },
    alertTitle: {
        fontSize: 15,
        lineHeight: 24,
        color: THEME.WARNING_COLOR,
    },
    title: {
        marginVertical: 25,
        fontSize: 17,
        textAlign: 'center'
    }
})

PersonalInfo.propTypes = {
    navigation: PropTypes.object
}

export default PersonalInfo;
