import React from 'react';
import {StyleSheet, TouchableOpacity, TouchableNativeFeedback, ScrollView, View, Text, Platform} from 'react-native';
import SvgUri from "expo-svg-uri";
import {THEME} from "../../theme";
import {AppText} from "../../components/ui/AppText";

const Offers = props => {
    const {navigation} = props;
    const Wrapper = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

    return (
        <ScrollView style={styles.container}>
            <View style={{paddingVertical: 15}}>
                {[1, 2, 3, 4, 5].map(el => (
                    <Wrapper onPress={() => navigation.navigate('JobOffer')} activeOpacity={0.7} key={el}>
                        <View style={styles.offer}>
                            <Text style={styles.offerTitle}>Job role {el}</Text>
                            <AppText style={styles.offerText}>Begin: 23. Dec 2020 10:00 (2hrs)</AppText>
                            <AppText style={styles.offerText}>Job Location</AppText>
                            <AppText style={styles.offerStatus}>Status: Job Accepted</AppText>
                            <View style={styles.imgBox}>
                                <SvgUri source={require("../../images/arrow-right.svg")}/>
                            </View>
                        </View>
                    </Wrapper>
                ))}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        height: '100%',
        backgroundColor: '#fff',
    },
    offer: {
        marginVertical: 7.5,
        padding: 12,
        backgroundColor: THEME.GREY_COLOR_2
    },
    offerTitle: {
        marginBottom: 5,
        fontFamily: 'Inter-Medium',
        fontSize: 17,
        lineHeight: 24,
    },
    offerText: {
        marginBottom: 5,
        fontSize: 13,
        color: "#71717A"
    },
    offerStatus: {
        fontSize: 13,
        color: THEME.MAIN_COLOR
    },
    imgBox: {
        position: 'absolute',
        top: '50%',
        right: 16,
        zIndex: 2
    }
})

export default Offers;
