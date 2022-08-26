import React, {memo} from 'react';
import {View, StyleSheet} from 'react-native';
import SvgUri from "expo-svg-uri";
import {THEME} from "../../../theme";
import {AppButton} from "../../../components/ui/AppButton";
import {AppTextBold} from "../../../components/ui/AppTextBold";
import {AppText} from "../../../components/ui/AppText";

const ResetSuccessfully = props => {
    const {navigation} = props;
    const doneHandler = () => navigation.navigate('Sign In');

    return (
        <View style={styles.container}>
            <View style={{alignItems: 'center'}}>
                <View style={styles.imgBox}>
                    <SvgUri source={require("../../../images/mail-download.svg")}/>
                </View>
                <View style={styles.info}>
                    <AppText style={styles.infoDesc}>We’ve sent you email to</AppText>
                    <AppTextBold style={styles.infoEmail}>example@email.fi</AppTextBold>
                </View>
                <View style={styles.alert}>
                    <AppText style={styles.alertTitle}>Please, check your email and follow the instructions</AppText>
                    <AppText style={styles.alertDesc}>Note, if you didn’t receive the email, check “Spam” or “Junk”
                        folders</AppText>
                </View>
            </View>
            <AppButton onPress={doneHandler} bgColor={THEME.MAIN_COLOR}>
                Valmis
            </AppButton>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 80,
        paddingHorizontal: 20,
        height: "100%",
        backgroundColor: '#fafafa'
    },
    imgBox: {
        width: 94,
        height: 94,
        alignItems: 'center',
        marginBottom: 20
    },
    info: {
        alignItems: 'center',
        marginBottom: 60
    },
    infoDesc: {
        marginBottom: 8,
        fontSize: 15,
        color: "#71717A",
    },
    infoEmail: {
        fontSize: 20,
        color: "#22C55E",
    },
    alert: {
        marginBottom: 27,
        padding: 16,
        borderWidth: 1,
        borderColor: THEME.BORDER_MAIN_COLOR,
        backgroundColor: THEME.GREY_COLOR,
    },
    alertTitle: {
        marginBottom: 14,
        fontFamily: 'Inter-Medium',
        textAlign: 'center',
        fontSize: 17,
    },
    alertDesc: {
        textAlign: 'center',
        fontSize: 15,
    }
})

export default memo(ResetSuccessfully)
