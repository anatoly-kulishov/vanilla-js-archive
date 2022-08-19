import React from 'react';
import {StyleSheet, ScrollView, View, Image} from 'react-native';
import PropTypes from "prop-types";
import {THEME} from "../../theme";
import onBoardingStyles from "./styles";
import {AppText} from "../../components/ui/AppText";
import {AppButton} from "../../components/ui/AppButton";

const Screen_1 = props => {
    const {navigation} = props;
    return (
        <ScrollView style={styles.container}>
            <View style={styles.wrapper}>
                <View style={{alignItems: 'center'}}>
                    <View style={styles.imgBox}>
                        <Image source={require("../../images/board-1.png")}
                               style={{width: 150, height: 120, marginHorizontal: 'auto'}}/>
                    </View>
                    <AppText style={styles.title}>
                        Fill the profile
                    </AppText>
                    <AppText style={styles.desc}>
                        Joblink is an app that allows you to find temporary work easily. First of all, you need to fill
                        in the basic information in your profile. So we’ll be able to send you relevant offers based on
                        your skillset.
                    </AppText>
                </View>
                <AppButton onPress={() => navigation.navigate('OnBoarding 2')}
                           bgColor={THEME.MAIN_COLOR}>Ohita</AppButton>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create(onBoardingStyles);

Screen_1.propTypes = {
    navigation: PropTypes.object
}

export default Screen_1;

