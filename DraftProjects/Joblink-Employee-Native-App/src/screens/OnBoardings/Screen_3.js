import React from 'react';
import {StyleSheet, ScrollView, View, Image} from 'react-native';
import PropTypes from "prop-types";
import {THEME} from "../../theme";
import onBoardingStyles from "./styles";
import {AppText} from "../../components/ui/AppText";
import {AppButton} from "../../components/ui/AppButton";

const Screen_3 = props => {
    const {navigation} = props;
    return (
        <ScrollView style={styles.container}>
            <View style={styles.wrapper}>
                <View style={{alignItems: 'center'}}>
                    <View style={styles.imgBox}>
                        <Image source={require("../../images/board-3.png")}
                               style={{width: 213, height: 120, marginHorizontal: 'auto'}}/>
                    </View>
                    <AppText style={styles.title}>
                        Receive offers, work and get paid!
                    </AppText>
                    <AppText style={styles.desc}>
                        Receive the offers for relevant jobs when they appear and accept them. You will receive
                        notifications about new offers and can always reach out to our support via the chat within the
                        app.
                    </AppText>
                </View>
                <AppButton onPress={() => navigation.navigate('GeneralNavigation')}
                           bgColor={THEME.MAIN_COLOR}>Let’s go!</AppButton>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create(onBoardingStyles);

Screen_3.propTypes = {
    navigation: PropTypes.object
}

export default Screen_3;

