import React, {memo, useState} from 'react';
import PropTypes from "prop-types";
import {StyleSheet, ScrollView, View, Platform, TouchableNativeFeedback, TouchableOpacity} from 'react-native';
import {THEME} from "../../theme";
import {AppText} from "../../components/ui/AppText";
import Notifications from "./Notifications";
import Messages from "./Messages";

const AllNotifications = ({navigation}) => {
    const [selectedScreen, setSelectedScreen] = useState('AllNotifications');
    const isNotifications = selectedScreen === 'AllNotifications';
    const isMessages = selectedScreen === 'Messages';
    const Wrapper = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

    return (
        <ScrollView style={{backgroundColor: '#fff'}}>
            <View style={styles.container}>
                <View style={styles.nav}>
                    <View style={{width: "50%"}}>
                        <Wrapper onPress={() => setSelectedScreen("AllNotifications")} activeOpacity={0.7}>
                            <View
                                style={(isNotifications) ? {...styles.navSwitch, ...styles.activeSwitch} : styles.navSwitch}>
                                <AppText>
                                    Notifications
                                </AppText>
                            </View>
                        </Wrapper>
                    </View>
                    <View style={{width: "50%"}}>
                        <Wrapper onPress={() => setSelectedScreen("Messages")} activeOpacity={0.7}>
                            <View
                                style={(isMessages) ? {...styles.navSwitch, ...styles.activeSwitch} : styles.navSwitch}>
                                <AppText>
                                    Messages
                                </AppText>
                            </View>
                        </Wrapper>
                    </View>
                </View>
                <View>
                    {isNotifications && <Notifications navigation={navigation}/>}
                    {isMessages && <Messages navigation={navigation}/>}
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        maxHeight: '100%',
        padding: 15,
    },
    nav: {
        flexDirection: 'row',
        justifyContent: 'center',

        padding: 3,
        marginBottom: 25,
        borderWidth: 1,
        borderRadius: 40,
        borderColor: THEME.GREY_COLOR
    },
    navSwitch: {
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 24,
        alignItems: 'center'
    },
    activeSwitch: {
        color: THEME.MAIN_COLOR,
        backgroundColor: THEME.SECONDARY_COLOR
    }
});

AllNotifications.propTypes = {
    navigation: PropTypes.object
}

export default memo(AllNotifications);
