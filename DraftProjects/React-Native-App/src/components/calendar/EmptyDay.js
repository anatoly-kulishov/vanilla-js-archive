import React from 'react';
import {View, StyleSheet, TouchableOpacity, Platform, TouchableNativeFeedback} from 'react-native';
import PropTypes from 'prop-types';
import {AppText} from "../ui/AppText";

const EmptyDay = props => {
    const {date, state, onPressCallback} = props;
    const Wrapper = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

    return (
        <Wrapper onPress={() => onPressCallback(date)} activeOpacity={0.7}>
            <View style={styles.dayBox}>
                <AppText style={{...styles.dayTitle, color: state === 'disabled' ? '#A1A1AA' : 'black'}}>
                    {date.day ? date.day : date}
                </AppText>
            </View>
        </Wrapper>
    )
}

EmptyDay.propTypes = {
    date: PropTypes.any,
    state: PropTypes.any,
    onPressCallback: PropTypes.func
}

const styles = StyleSheet.create({
    dayBox: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 30,
        height: 30,
        borderRadius: 50,
    },
    dayTitle: {
        fontSize: 15,
        textAlign: 'center',
    }
});

export default React.memo(EmptyDay)
