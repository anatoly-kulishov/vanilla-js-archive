import React, {memo} from 'react';
import {Platform, StyleSheet, TouchableNativeFeedback, TouchableOpacity, View} from 'react-native';
import PropTypes from "prop-types";
import SvgUri from "expo-svg-uri";
import {THEME} from "../../../theme";
import {BoxesStyles} from "../../../styles";
import {AppText} from "../../../components/ui/AppText";
import {AppButton} from "../../../components/ui/AppButton";

const Messages = props => {
    const {navigation} = props;
    const Wrapper = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
    const activeFlag = true;

    return (
        <View style={styles.container}>
            <View>
                {activeFlag ? (
                    <Wrapper onPress={() => navigation.navigate("Chat")}>
                        <View style={{...styles.box, ...styles.boxActive}}>
                            <View style={styles.boxTitleWrap}>
                                <View style={styles.activeDot}/>
                                <AppText style={styles.boxTitle}>Joblink Support</AppText>
                            </View>
                            <AppText style={styles.boxSubTitle}>Pretium diam est ipsum fames.</AppText>
                            <AppText style={styles.boxDesc}>1 Helmikuu, 12:49</AppText>
                            <View style={styles.arrow}>
                                <SvgUri style={styles.arrowImg} source={require("../../../images/arrow-right.svg")}/>
                            </View>
                        </View>
                    </Wrapper>
                ) : (
                    <Wrapper onPress={() => navigation.navigate("Chat")}>
                        <View style={styles.box}>
                            <View style={styles.boxTitleWrap}>
                                <AppText style={styles.boxTitle}>Joblink Support</AppText>
                            </View>
                            <AppText style={styles.boxSubTitle}>Pretium diam est ipsum fames.</AppText>
                            <AppText style={styles.boxDesc}>1 Helmikuu, 12:49</AppText>
                            <View style={styles.arrow}>
                                <SvgUri style={styles.arrowImg} source={require("../../../images/arrow-right.svg")}/>
                            </View>
                        </View>
                    </Wrapper>
                )}
                {/********** Mock **********/}
                <Wrapper onPress={() => navigation.navigate("Chat")}>
                    <View style={styles.box}>
                        <View style={styles.boxTitleWrap}>
                            <AppText style={styles.boxTitle}>Joblink Support</AppText>
                        </View>
                        <AppText style={styles.boxSubTitle}>Pretium diam est ipsum fames.</AppText>
                        <AppText style={styles.boxDesc}>1 Helmikuu, 12:49</AppText>
                        <View style={styles.arrow}>
                            <SvgUri style={styles.arrowImg} source={require("../../../images/arrow-right.svg")}/>
                        </View>
                    </View>
                </Wrapper>
                {/********** Mock **********/}
            </View>
            <View style={{marginVertical: 15}}>
                <AppButton onPress={() => navigation.navigate("Chat")}
                           bgColor={THEME.MAIN_COLOR}>Write new message</AppButton>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    ...BoxesStyles,
})

Messages.propTypes = {
    navigation: PropTypes.object
}

export default memo(Messages);
