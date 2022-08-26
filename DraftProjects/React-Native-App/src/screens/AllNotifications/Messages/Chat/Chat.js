import React, {useState, useRef, useEffect, memo} from 'react';
import {Platform, ScrollView, StyleSheet, TextInput, TouchableNativeFeedback, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SvgUri from "expo-svg-uri";
import {THEME} from "../../../../theme";
import {AppText} from "../../../../components/ui/AppText";

const Chat = () => {
    const Wrapper = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
    const [message, setMessage] = useState();
    let scrollView = useRef();

    const submitBtnStylesIOS = {top: 9, right: 18};
    const submitBtnStylesAndroid = {top: "50%", right: 28};
    const submitBtnStyles = Platform.OS === 'ios' ? submitBtnStylesIOS : submitBtnStylesAndroid;

    const submitHandler = () => {
        console.log("Chat.js => submitHandler()")
    }

    useEffect(() => {
        scrollView.current.scrollToEnd({animated: true})
    }, [])

    return (
        <KeyboardAwareScrollView style={{backgroundColor: "#fff"}}>
            <ScrollView style={styles.container} ref={scrollView}>
                <View style={styles.wrapper}>
                    <View style={{paddingBottom: 25}}>
                        <View style={styles.messageScoop}>
                            <View style={{...styles.message, ...styles.yourMessage}}>
                                <AppText style={{...styles.messageTime, marginRight: 5}}>12:04</AppText>
                                <View style={{...styles.messageBox, ...styles.yourMessageBox}}>
                                    <AppText style={styles.messageText}>
                                        Mauris.
                                    </AppText>
                                </View>
                            </View>
                            <View style={{...styles.message, ...styles.yourMessage}}>
                                <AppText style={{...styles.messageTime, marginRight: 5}}>12:04</AppText>
                                <View style={{...styles.messageBox, ...styles.yourMessageBox}}>
                                    <AppText style={styles.messageText}>
                                        Maecenas sit proin.
                                    </AppText>
                                </View>
                            </View>
                        </View>
                        <View style={styles.messageScoop}>
                            <View style={{...styles.message, ...styles.foreignMessage}}>
                                <View style={{...styles.messageBox, ...styles.foreignMessageBox}}>
                                    <AppText style={styles.messageText}>
                                        Tortor eleifend aliquet.
                                    </AppText>
                                </View>
                                <AppText style={{...styles.messageTime, marginLeft: 5}}>12:06</AppText>
                            </View>
                        </View>
                        <View style={styles.messageScoop}>
                            <View style={{...styles.message, ...styles.yourMessage}}>
                                <AppText style={{...styles.messageTime, marginRight: 5}}>12:08</AppText>
                                <View style={{...styles.messageBox, ...styles.yourMessageBox}}>
                                    <AppText style={styles.messageText}>
                                        Maecenas sit proin.
                                    </AppText>
                                </View>
                            </View>
                            <View style={{...styles.message, ...styles.yourMessage}}>
                                <AppText style={{...styles.messageTime, marginRight: 5}}>12:08</AppText>
                                <View style={{...styles.messageBox, ...styles.yourMessageBox}}>
                                    <AppText style={styles.messageText}>
                                        Sed eu at rhoncus.
                                    </AppText>
                                </View>
                            </View>
                        </View>
                        <View style={styles.messageScoop}>
                            <View style={{...styles.message, ...styles.foreignMessage}}>
                                <View style={{...styles.messageBox, ...styles.foreignMessageBox}}>
                                    <AppText style={styles.messageText}>
                                        Nisi risus sed ut nullam.
                                    </AppText>
                                </View>
                                <AppText style={{...styles.messageTime, marginLeft: 5}}>12:10</AppText>
                            </View>
                            <View style={{...styles.message, ...styles.foreignMessage}}>
                                <View style={{...styles.messageBox, ...styles.foreignMessageBox}}>
                                    <AppText style={styles.messageText}>
                                        Tortor eleifend aliquet sed ut nullam.
                                    </AppText>
                                </View>
                                <AppText style={{...styles.messageTime, marginLeft: 5}}>12:10</AppText>
                            </View>
                        </View>
                        <View style={styles.messageScoop}>
                            <View style={{...styles.message, ...styles.yourMessage}}>
                                <AppText style={{...styles.messageTime, marginRight: 5}}>12:08</AppText>
                                <View style={{...styles.messageBox, ...styles.yourMessageBox}}>
                                    <AppText style={styles.messageText}>
                                        Maecenas sit proin.
                                    </AppText>
                                </View>
                            </View>
                            <View style={{...styles.message, ...styles.yourMessage}}>
                                <AppText style={{...styles.messageTime, marginRight: 5}}>12:08</AppText>
                                <View style={{...styles.messageBox, ...styles.yourMessageBox}}>
                                    <AppText style={styles.messageText}>
                                        Sed eu at rhoncus.
                                    </AppText>
                                </View>
                            </View>
                        </View>
                        <View style={styles.messageScoop}>
                            <View style={{...styles.message, ...styles.foreignMessage}}>
                                <View style={{...styles.messageBox, ...styles.foreignMessageBox}}>
                                    <AppText style={styles.messageText}>
                                        Nisi risus sed ut nullam.
                                    </AppText>
                                </View>
                                <AppText style={{...styles.messageTime, marginLeft: 5}}>12:10</AppText>
                            </View>
                            <View style={{...styles.message, ...styles.foreignMessage}}>
                                <View style={{...styles.messageBox, ...styles.foreignMessageBox}}>
                                    <AppText style={styles.messageText}>
                                        Tortor eleifend aliquet sed ut nullam.
                                    </AppText>
                                </View>
                                <AppText style={{...styles.messageTime, marginLeft: 5}}>12:10</AppText>
                            </View>
                        </View>
                        <View style={styles.messageScoop}>
                            <View style={{...styles.message, ...styles.yourMessage}}>
                                <AppText style={{...styles.messageTime, marginRight: 5}}>12:12</AppText>
                                <View style={{...styles.messageBox, ...styles.yourMessageBox}}>
                                    <AppText style={styles.messageText}>
                                        Maecenas sit proin rhoncus.
                                    </AppText>
                                </View>
                            </View>
                            <View style={{...styles.message, ...styles.yourMessage}}>
                                <AppText style={{...styles.messageTime, marginRight: 5}}>12:12</AppText>
                                <View style={{...styles.messageBox, ...styles.yourMessageBox}}>
                                    <AppText style={styles.messageText}>
                                        Sed eu at maecenas.
                                    </AppText>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.inputMessageWrap}>
                    <TextInput style={styles.inputMessage}
                               placeholder="Type message here..."
                               value={message}
                               onChangeText={setMessage}
                    />
                    <Wrapper onPress={submitHandler} activeOpacity={0.7}>
                        <View style={{...styles.submitBtn, ...submitBtnStyles}}>
                            <SvgUri style={styles.logo} source={require("../../../../images/send.svg")}/>
                        </View>
                    </Wrapper>
                </View>
            </ScrollView>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    wrapper: {
        padding: 15,
        paddingBottom: 35,
    },
    messageScoop: {
        marginBottom: 25
    },
    message: {
        width: 'auto',
        flexDirection: 'row',
        alignItems: 'center',

    },
    messageBox: {
        maxWidth: '90%',
        marginBottom: 4,
        paddingVertical: 8,
        paddingHorizontal: 16
    },
    yourMessage: {
        justifyContent: 'flex-end'
    },
    yourMessageBox: {
        backgroundColor: THEME.SECONDARY_COLOR
    },
    foreignMessageBox: {
        backgroundColor: THEME.GREY_COLOR
    },
    messageText: {
        fontSize: 16,
        color: "#3F3F46"
    },
    messageTime: {
        fontSize: 12,
        color: THEME.PLACEHOLDER_COLOR
    },
    inputMessageWrap: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 2,
        flexDirection: 'row',
        padding: 12,
        backgroundColor: THEME.GREY_COLOR_2
    },
    inputMessage: {
        width: '100%',
        padding: 10,
        paddingRight: 40,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: THEME.GREY_COLOR_4,
        fontSize: 16,
        backgroundColor: "#fff"
    },
    submitBtn: {
        height: '100%',
        position: 'absolute',
        zIndex: 3,
    }
})

export default memo(Chat);
