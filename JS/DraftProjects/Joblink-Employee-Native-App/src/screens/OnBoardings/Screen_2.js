import React from 'react';
import {StyleSheet, ScrollView, View, Image} from 'react-native';
import PropTypes from "prop-types";
import {THEME} from "../../theme";
import onBoardingStyles from "./styles";
import {AppText} from "../../components/ui/AppText";
import {AppButton} from "../../components/ui/AppButton";

const Screen_2 = props => {
    const {navigation} = props;
    return (
        <ScrollView style={styles.container}>
            <View style={styles.wrapper}>
                <View style={{alignItems: 'center'}}>
                    <View style={styles.imgBox}>
                        <Image source={require("../../images/board-2.png")}
                               style={{width: 120, height: 120, marginHorizontal: 'auto'}}/>
                    </View>
                    <AppText style={styles.title}>
                        Set your availability
                    </AppText>
                    <AppText style={styles.desc}>
                        Use the calendar tool to indicate the dates and time when you’ll be available or not available.
                        This way we’ll know when to send you the offers for new assignments.
                    </AppText>
                </View>
                <AppButton onPress={() => navigation.navigate('OnBoarding 3')}
                           bgColor={THEME.MAIN_COLOR}>Ohita</AppButton>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create(onBoardingStyles);

Screen_2.propTypes = {
    navigation: PropTypes.object
}

export default Screen_2;

